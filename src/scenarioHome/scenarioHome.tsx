import { Box, Group, Kbd, Loader, useMantineTheme,Text, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { type Scenario, type Vitals } from "../engine/types";
import engine from "../engine/engine";
import eventBus from "../common/eventBus";
import { Outlet } from "react-router";
import { Actions, type Action, type ActionKey } from "../engine/schemas/actionEnum";
import { useAppContext } from "../App";
import { OnLineHelp, type PageHelp } from "../common/onlineHelp";

type ScenarioOutletContext = {
    vitals: Vitals;
    getMedicalSituation: (() => string[]);
    helpNeeded: {
        value: boolean;
        toggle: () => void;
    }
}

export function ScenarioHome(){
    const theme = useMantineTheme();
    const { helpNeeded } = useAppContext(); //this is needed
    const knownAction = useRef(false);
    const params = useParams();
    const nav = useNavigate();
    const [scenarios,setScenarios] = useLocalStorage<Scenario[]>({key:"medisim-ongoing-scenarios",defaultValue:[]});
    const workingScenario = scenarios.find(scen => scen.uuid === params.scenarioId);
    const latestScenario = useRef<Scenario|null>(null);

    useHotkeys([
        ['1', () => { nav("vitals") }],
        ['2', () => { nav("cabinet") }],
        ['3', () => { nav("info") }],
        ['4', () => { nav("ventilation") }],
        ['d', () => { eventBus.emit("buttonPressed", { action: "callDoctor" }) }]
    ]);


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


    function actionHandle(action:ActionKey) {
        knownAction.current=true;
        const changed = engine.actionHappend(action);
        latestScenario.current = changed;
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
            
            setScenarios((prev)=>{
                if(prev.length==0) return [];
                return prev.filter(val=>val.uuid!==params.scenarioId);
            });
            nav("/report",{state:{scenario:latestScenario.current},replace:true});
        });

        return ()=>{
            unsub();
            unsub2();
            unsub3();
            unsub4();
        }
    }, []);


    
    
    useEffect(() => {
        if (!workingScenario) return;

        if(knownAction.current){
            knownAction.current=false;
            return;
        }

        const copy = structuredClone(workingScenario);
        engine.setScenario(copy);
    }, [params.scenarioId,workingScenario]);

    if(!workingScenario){
        return <Loader></Loader>
    }



    // 3. Compute the context synchronously on every render
    const scenarioOutletContext: ScenarioOutletContext = {
        vitals: workingScenario.state.vitals,
        getMedicalSituation: ()=>{ return engine.getEventsTillCurrent()},
        helpNeeded:helpNeeded
    };
    

    return(
        <Box h={"100dvh"}
            style={{
                backgroundImage: "url('/workspace.png')", // Replace with your image path or import
                backgroundSize: "cover",      // Ensures the image fills the entire box
                backgroundPosition: "center",  // Centers the image
                backgroundRepeat: "no-repeat", // Prevents tiling
                backgroundAttachment: "fixed"  // Optional: keeps background static while content scrolls
            }}>

            <Outlet context={workingScenario ? scenarioOutletContext : null}></Outlet>

            
        </Box>
    )
}

export function useScenarioContext(){
    return useOutletContext<ScenarioOutletContext>();
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

// needed
