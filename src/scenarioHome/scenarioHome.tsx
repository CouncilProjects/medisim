import { Box, Group, Kbd, Loader, useMantineTheme,Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocalStorage } from "@mantine/hooks";
import { type Scenario } from "../engine/types";
import engine from "../engine/engine";
import eventBus from "../common/eventBus";
import { Outlet } from "react-router";
import type { Action } from "../engine/schemas/actionEnum";

export function ScenarioHome(){
    const theme = useMantineTheme();

    const knownAction = useRef(false);
    const params = useParams();
    const nav = useNavigate();
    const [scenarios,setScenarios] = useLocalStorage<Scenario[]>({key:"medisim-ongoing-scenarios",defaultValue:[]});
    const workingScenario = scenarios.find(scen => scen.uuid === params.scenarioId);


    //notify of hint
    useEffect(()=>{
        notifications.show(
            {
                title: "Tip !",
                message: <Shortcut symbolA="shift" symbolB="s" description="To see interactive elements"></Shortcut>,
                autoClose: 4000,
                color: theme.colors.green[3],
                position: 'top-right'
            });
    },[]);


    function actionHandle(action:Action) {
        knownAction.current=true;
        const changed = engine.actionHappend(action);
        if(changed==null) return;
        
        setScenarios((prev)=>{
            return prev.map(scen=>scen.uuid==params.scenarioId?changed:scen);
        });

    }

    
    useEffect(() => {

        const unsub = eventBus.on("actionResult",({valid,score})=>{
            if(!valid){
                notifications.show(
                    {
                        title: <Text c={theme.colors.red[3]}>"NO !"</Text>,
                        message: "That is not the proper move new score "+score,
                        autoClose: 4000,
                        color: theme.colors.red[9],
                        position: 'top-center'
                    }
                );
            }
            
        });

        const unsub2 = eventBus.on("movedToNewNode", ({ nodeTitle }) => {
                notifications.show(
                    {
                        title: "Medical event !",
                        message: nodeTitle,
                        autoClose: 60*nodeTitle.length,
                        color: theme.colors.cyan[0],
                        position: 'top-center'
                    }
                );
        });

        const unsub3 = eventBus.on("buttonPressed",({action})=>{actionHandle(action);});

        const unsub4 = eventBus.on("end", () => {
            notifications.show(
                {
                    title: "Scenario finished !",
                    message: "Good job !! ",
                    autoClose: 4000,
                    color: 'blue',
                    position: 'top-center'
                }
            );
            setScenarios((prev)=>{
                if(prev.length==0) return [];
                return prev.filter(val=>val.uuid!==params.scenarioId);
            });
            nav("/home");
        });

        return ()=>{
            unsub();
            unsub2();
            unsub3();
            unsub4();
        }
    }, []);

    
    
    useEffect(() => {
        console.log("Done :" +knownAction);
        if (!workingScenario) return;

        if(knownAction.current){
            knownAction.current=false;
            return;
        }

        const copy = structuredClone(workingScenario);
        engine.setScenario(copy);

        
        return () => {
            console.log("Ending effect deregistering eventbus");
        };
    }, [params.scenarioId,workingScenario]);

    if(!workingScenario){
        return <Loader></Loader>
    }
    

    return(
        <Box h={"100dvh"}
            style={{
                backgroundImage: "url('/workspace.png')", // Replace with your image path or import
                backgroundSize: "cover",      // Ensures the image fills the entire box
                backgroundPosition: "center",  // Centers the image
                backgroundRepeat: "no-repeat", // Prevents tiling
                backgroundAttachment: "fixed"  // Optional: keeps background static while content scrolls
            }}>
            <Outlet context={workingScenario ? workingScenario.state.vitals : null}></Outlet>
        </Box>
    )
}

function Shortcut({ symbolA, symbolB, description }: { symbolA: string; symbolB: string; description: string }) {
    return (
        <Group gap={7} p={10}>
            <Kbd size={15}>{symbolA}</Kbd>
            <Box fz={22} fw={500}>
                +
            </Box>
            <Kbd size={15} w={40}>
                {symbolB}
            </Kbd>

            <Box fz={18} ms="sm">
                – {description}
            </Box>
        </Group>
    );
}