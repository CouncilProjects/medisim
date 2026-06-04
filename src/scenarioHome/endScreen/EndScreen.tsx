import { useEffect, useRef } from "react"
import { Accordion, Box, Button, Card,Center,Divider,Group,Image,List,Loader,Modal,NumberFormatter,rgba,Stack,Text, Timeline, TimelineItem } from "@mantine/core";
import type { Action } from "../../engine/schemas/actionEnum";
import { useLocation, useNavigate } from "react-router";
import engine from "../../engine/engine";
import { OnLineHelp, type PageHelp } from "../../common/onlineHelp";
import { useAppContext } from "../../App";
import { downloadJSON,downloadPDF } from "./downloadFunctions";


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

    if(debrif==null){
        return <Loader></Loader>
    }

    const now = new Date();
    const dateTOprint =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + " " +
        String(now.getHours()).padStart(2, "0") + "-" +
        String(now.getMinutes()).padStart(2, "0");

    return <Center w={'100%'} h={'100%'}>
        <Card p={12} m={4}>
            <Group justify="space-between">
                <Text fw={1000}>Your report</Text>
                
                <Group>
                    <Button leftSection={<Image src={"/download.svg"} w={32} h={32}></Image>} onClick={() => { downloadJSON(debrif) }}>Download .json</Button>
                    <Button leftSection={<Image src={"/download.svg"} w={32} h={32}></Image>} onClick={() => { downloadPDF(debrif,dateTOprint) }}>Download .pdf</Button>
                </Group>
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
                {stepContent:"Pressing on 'details' brings up the actions taken and how they affected the score"}
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


