import { useEffect, useState } from "react"
import type { Scenario } from "../../engine/types"
import { Accordion, Box, Button, Card,Center,Collapse,Divider,Group,Image,List,NumberFormatter,rgba,Stack,Text, Timeline, TimelineItem } from "@mantine/core";
import type { Action } from "../../engine/schemas/actionEnum";
import { useLocation, useNavigate } from "react-router";
import engine from "../../engine/engine";


type EndScreenProps={
    scenario:Scenario
}

export function EndScreen(){
    const location = useLocation();
    const [done,setDone] = useState(false);
    const navigate = useNavigate();

    console.log(location.state);

    useEffect(() => {
        const handlePopState = () => {
            navigate("/", { replace: true });
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    useEffect(()=>{
        window.addEventListener('beforeunload', (event) => {
            // Most browsers require you to set preventDefault and a return value
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave?';
        });
    },[]);

    const debrif:Debrief = engine.getDebrief(location.state.scenario);


    /*if(!done){
        return <Card>
            <Text fw={1000} variant="text">Creating debrefing and report wait and dont refresh...</Text>
        </Card>
    }*/

    // Source - https://stackoverflow.com/a/49917066
    // Posted by Stefanos Chrs, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-06-01, License - CC BY-SA 4.0

    function download() {
        const data = new Blob([JSON.stringify(debrif)], { type:'application/json'});
        let date = new Date().toJSON();
        const name = "medisim-Report-"+date+".json"

        const url = URL.createObjectURL(data);

        const a = document.createElement('a')
        a.href = url
        a.download = name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }


    return <Center w={'100%'} h={'100%'} bg={rgba('red',0.6)}>
        <Card p={12} m={4}>
            <Group justify="space-between">
                <Text fw={1000}>Your report</Text>
                <Button leftSection={<Image src={"/download.svg"} w={32} h={32}></Image>} onClick={()=>{download()}}>Download</Button>
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
                                                            return <List.Item><Text>{act.valid ? '✅' : '❌'} {act.action} cause score to change by {act.scoreDelta}</Text></List.Item>
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
    </Center>


}


/**
 * <Stack>
                {
                    debrif.timeline.map(nodeTimeline=>{
                        return(
                            <Stack>
                                <Group>For node: {nodeTimeline.duringNode} total actions : {nodeTimeline.nodeTimeline.length}</Group>
                                {
                                    nodeTimeline.nodeTimeline.map(actionSnapshot => {
                                        return (
                                            <Text>{actionSnapshot.valid ?'✅':'❌'} {actionSnapshot.action} cause score to change by {actionSnapshot.scoreDelta}</Text>
                                        )
                                    })
                                }
                                <Divider></Divider>
                            </Stack>
                        );
                    })
                }
            </Stack>
 */

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



