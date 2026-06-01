import { useEffect } from "react"
import { Accordion, Box, Button, Card,Center,Divider,Group,Image,List,Loader,Modal,NumberFormatter,rgba,Stack,Text, Timeline, TimelineItem } from "@mantine/core";
import type { Action } from "../../engine/schemas/actionEnum";
import { useLocation, useNavigate } from "react-router";
import engine from "../../engine/engine";
import { jsPDF } from "jspdf";
import { OnLineHelp, type PageHelp } from "../../common/onlineHelp";
import { useAppContext } from "../../App";


export function EndScreen(){
    const location = useLocation();
    const navigate = useNavigate();
    const { helpNeeded } = useAppContext();
   
    const scen = location.state?.scenario;

    useEffect(()=>{
        if(scen==undefined){
            navigate("/home", { replace: true });
        }
    },[scen]);

    const debrif = scen ? engine.getDebrief(scen) : null;

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);

        const handlePop = () => {
            navigate('/home', { replace: true });
        };

        window.addEventListener('popstate', handlePop);
        return () => window.removeEventListener('popstate', handlePop);
    }, [navigate]);

    useEffect(() => {
        // @ts-ignore
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // Some browsers require returnValue for the dialog to show
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);


    // Source - https://stackoverflow.com/a/49917066
    // Posted by Stefanos Chrs, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-06-01, License - CC BY-SA 4.0

    function downloadJSON() {
        const data = new Blob([JSON.stringify(debrif)], { type:'application/json'});
        const date = new Date().toJSON();
        const name = "medisim-Report-"+date+".json"

        const url = URL.createObjectURL(data);

        const a = document.createElement('a')
        a.href = url
        a.download = name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    function downloadPDF() {
        const doc = new jsPDF();
        const date = new Date().toJSON();

        const now = new Date();
        const dateTOprint = 
            now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0") + " " +
            String(now.getHours()).padStart(2, "0") + "-" +
            String(now.getMinutes()).padStart(2, "0");

        const name = "medisim-Report-" + date + ".pdf"
        let i = 10;
        const pageHeight = doc.internal.pageSize.height;

        const defaultOption:defOptions = {
            fontSize : 10,
            color :[0, 0, 0],
            lineHeightTimes : 0.5,
        }

        type defOptions = {
            fontSize?:number,
            color?:[number,number,number],
            lineHeightTimes?:number
        }

        function addWrapped(text:string, x:number, options:defOptions = defaultOption) {
            const {
                fontSize = 10,
                color = [0, 0, 0] as [number,number,number],
                lineHeightTimes = 0.5,
            } = options;

            doc.setFontSize(fontSize);
            
            doc.setTextColor(...color);

            const lineHeight = fontSize * lineHeightTimes;
            const lines = doc.splitTextToSize(text, 170);

            for (const line of lines) {
                if (i > pageHeight - 20) {
                    doc.addPage();
                    i = 20;
                }

                doc.text(line, x, i);
                i += lineHeight;
            }

            // reset (important so styling doesn't leak)
            doc.setTextColor(0, 0, 0);
        }

        addWrapped(debrif.scenarioName,10,{fontSize:15,lineHeightTimes:1});
        
        addWrapped(`Taken by: ${debrif.taker} Score: ${debrif.score}`, 15);
        addWrapped(`Accuracy: ${debrif.goodPercent}%`, 15);
        addWrapped(`Finished at : `+dateTOprint,10,{color:[130,100,200]})
        for (const nodeLine of debrif.timeline) {
            addWrapped(nodeLine.duringNode+":\" " + nodeLine.nodeText+"\"" , 20);
            
            for (const act of nodeLine.nodeTimeline) {
                if(act.valid){
                    doc.setTextColor(0, 255, 0);
                } else {
                    doc.setTextColor(255, 0, 0);
                }
                addWrapped(
                    `• [${act.action}] Affected score by: ${act.scoreDelta}`,
                    25,
                    {color:act.valid?[20,200,30]:[200,30,20]}
                );
                doc.setTextColor(0, 0, 0);
            }
        }
        

        
        doc.save(name);
    }

    if(debrif==null){
        return <Loader></Loader>
    }

    return <Center w={'100%'} h={'100%'} bg={rgba('red',0.6)}>
        <Card p={12} m={4}>
            <Group justify="space-between">
                <Text fw={1000}>Your report</Text>
                
                <Stack>
                    <Button leftSection={<Image src={"/download.svg"} w={32} h={32}></Image>} onClick={() => { downloadJSON() }}>Download .json</Button>
                    <Button leftSection={<Image src={"/download.svg"} w={32} h={32}></Image>} onClick={() => { downloadPDF() }}>Download .pdf</Button>
                </Stack>
            </Group>
            <Stack>
                <Text>Scenario : {debrif.scenarioName}</Text>
                <Text>Test taker : {debrif.taker}</Text>
                <Text>Final score : {debrif.score}</Text>
                <Text>Accuracy : <NumberFormatter value={debrif.goodPercent} decimalScale={2} suffix="%" /></Text>
            </Stack>
            <Divider></Divider>
            <Text>Timeline</Text>
            
            <Box mah={"60dvh"} style={{overflowY:'auto'}}>
                <Timeline active={debrif.timeline.length}>
                    {
                        debrif.timeline.map(nodeLine => {
                            return (
                                <TimelineItem title={nodeLine.duringNode}>
                                    <Text>{nodeLine.nodeText}</Text>
                                    <Accordion>
                                        <Accordion.Item key={nodeLine.duringNode} value={"Detailes"}>
                                            <Accordion.Control>Detailes</Accordion.Control>
                                            <Accordion.Panel>
                                                <List>
                                                    {
                                                        nodeLine.nodeTimeline.map(act => {
                                                            return <List.Item><Text>{act.valid ? '✅' : '❌'} [{act.action}] caused score to change by {act.scoreDelta}</Text></List.Item>
                                                        })
                                                    }
                                                </List>
                                            </Accordion.Panel>
                                           
                                        </Accordion.Item>
                                        
                                    </Accordion>
                                </TimelineItem>
                            )
                        })
                    }
                </Timeline>
            </Box>
        </Card>
         <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="On-line help">
            <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
        </Modal>
    </Center>


}

export type Debrief ={
    taker:string,
    scenarioName:string,
    score:number,
    goodPercent:number,
    timeline:NodeTimelineSnapshot[]
}



export type NodeTimelineSnapshot = {
    duringNode:string,
    nodeText:string,
    nodeTimeline:ActionSnapshot[]
}

export type ActionSnapshot = {
    action:Action,
    valid:boolean,
    scoreDelta:number
}

const onlineHelp:PageHelp = {
    pageTitle:"Report page",
    activeSections:[
        {
            title:"Timeline",
            steps:[
                {stepContent:"The timeline shows what path was taken"},
                {stepContent:"Pressing on 'detailes' brings up the actions taken and how they affected the score"}
            ]
        },
        {
            title: ".json download",
            steps: [
                { stepContent: "Download the report in json format" },
            ]
        },
        {
            title: ".pdf download",
            steps: [
                { stepContent: "Download the report in pdf format" },
            ]
        }
    ]
}


