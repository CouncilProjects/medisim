import { Box, Button, Card, Center, Container, Divider, Modal, Stack,Text,Title, Tooltip } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useNavigate, useOutletContext } from "react-router-dom";
import { type OutletContextType } from "../App";
import { OnLineHelp, type PageHelp } from "../common/onlineHelp";
import LoadScenario from "./load";

type testScenario = {
    scenario: string;
    username: string;
    nodes:number
};


const onlineHelp:PageHelp={
    pageTitle:"Home",
    activeSections:[
        {
            title:"Load scenario",
            steps:[
                {
                    stepContent:"Press the load button"
                },
                {
                    stepContent:"Your file system will open up, chose the json containing your scenario"
                },
                {
                    stepContent:"When you select the scenario you will instantly start it as well",
                    important:true
                }
            ]
        },
        {
            title: "Resume scenario",
            steps: [
                {
                    stepContent: "Press the resume button"
                },
                {
                    stepContent: "A list of incomplete scenarios will open up, chose the scenario you wish to continiue"
                },
                {
                    stepContent: "When you select the scenario you will instantly resume it as well",
                    important: true
                }
            ]
        },
        {
            title: "Preview area",
            steps: [
                {
                    stepContent: "Press the preview button"
                },
                {
                    stepContent: "The image describing your workarea will open up"
                },
            ]
        }
    ]
}


export default function Home(){

    //https://mantine.dev/hooks/use-local-storage/

    const [storedScen, setStoredScen,removeStoredScen] = useLocalStorage<testScenario[]>({
        key: 'ongoing-scenarios',
        defaultValue: [],
    });

    const nav = useNavigate();

    const [resumePanel,resumePanelHandlers] = useDisclosure(false);
    const [loadPanel, loadPanelHandlers] = useDisclosure(false);
    const [downPanel, downPanelHandlers] = useDisclosure(false);
    const { helpNeeded } = useOutletContext<OutletContextType>();
    console.log(helpNeeded);

    return(
        <Center h={'100dvh'}>
            <Card>
                <Title>Medisim home</Title>
                <Text size="sm">Chose an action</Text>
                <Box>
                    <Stack>
                            <Button onClick={loadPanelHandlers.toggle}>
                                <Text>Load a scenario</Text>
                            </Button>


                            <Button disabled={storedScen == null} onClick={() => { resumePanelHandlers.toggle() }}>
                                <Text>Resume a scenario</Text>
                            </Button>


                            <Button onClick={()=>{nav("/test")}}>
                                <Text>Preview area</Text>
                            </Button>

                    </Stack>
                </Box>
            </Card>
            <Modal opened={resumePanel} onClose={resumePanelHandlers.close} title="Select scenario">
                {storedScen.map((scen)=>
                    <ChoiceCard scen={scen} onClicked={()=>{resumePanelHandlers.close(); console.log(scen)}}></ChoiceCard>
                )}
            </Modal>

            {loadPanel &&
                <LoadScenario closeFun={loadPanelHandlers.close}></LoadScenario>
            }

            <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="On-line help">
               <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
            </Modal>
        </Center>
    )
}

function ChoiceCard({scen,onClicked}:{scen:any,onClicked:any}){
    const [hovered,handlers] = useDisclosure(false)

    return(
        <Card style={{cursor:'pointer'}} onClick={onClicked} mb={hovered?10:4} mt={hovered?6:0} p={4} pl={10} onPointerEnter={()=>{handlers.open()}} onPointerLeave={()=>{handlers.close()}} bd={hovered?"1px solid orange":"none"}>
            <Stack p={1}>
                <Text m={0}>Scenario : {scen.scenario}</Text>
                <Text m={0}>Taken by : {scen.username}</Text>
            </Stack>
        </Card>
    )
}