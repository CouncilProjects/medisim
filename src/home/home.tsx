import { Box, Button, Card, Container, Divider, Modal, Stack,Text,Title, Tooltip } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useNavigate, useOutletContext } from "react-router-dom";
import { type OutletContextType } from "../App";
import { OnLineHelp, type PageHelp } from "../common/onlineHelp";

type testScenario = {
    name: string;
    user: string;
    timeStarted: string;
};

function Test() {
        const defaultScenarios: testScenario[] = [
            { name: "Scenario 1", user: "Alice", timeStarted: "10:00" },
            { name: "Scenario 2", user: "Bob", timeStarted: "10:15" },
            { name: "Scenario 3", user: "Charlie", timeStarted: "10:30" },
            { name: "Scenario 4", user: "Diana", timeStarted: "10:45" },
        ];

        localStorage.setItem('ongoing-scenarios',JSON.stringify(defaultScenarios));

        return null;
    }


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
    const { helpNeeded } = useOutletContext<OutletContextType>();
    console.log(helpNeeded);

    return(
        <Container>
            <Card>
                <Title>Medisim home</Title>
                <Text size="sm">Chose an action</Text>
                <Box>
                    <Stack>

                            <Button>
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
                {storedScen.map((scen,index)=>
                    <ChoiceCard scen={scen} onClicked={()=>{resumePanelHandlers.close(); console.log(scen)}}></ChoiceCard>
                )}
            </Modal>

            <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="On-line help">
               <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
            </Modal>
        </Container>
    )
}

function ChoiceCard({scen,onClicked}){
    const [hovered,handlers] = useDisclosure(false)

    return(
        <Card style={{cursor:'pointer'}} onClick={onClicked} mb={hovered?10:4} mt={hovered?6:0} p={4} pl={10} onPointerEnter={(e)=>{handlers.open()}} onPointerLeave={()=>{handlers.close()}} bd={hovered&&"1px solid orange"}>
            <Stack p={1}>
                <Text m={0}>Scenario : {scen.name}</Text>
                <Text m={0}>Taken by : {scen.user}</Text>
            </Stack>
        </Card>
    )
}