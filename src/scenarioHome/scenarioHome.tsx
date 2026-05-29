import { Box, Group, JsonInput, Kbd, keys, NativeScrollArea, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { makeHotspot, OverlayImage } from "../common/overlayHotspot";
import { useNavigate, useParams } from "react-router";
import { useLocalStorage } from "@mantine/hooks";
import { type Scenario } from "../engine/types";
import engine, { Engine } from "../engine/engine";
import eventBus from "../common/eventBus";
import { Actions } from "../engine/schemas/actionEnum";
import { Outlet } from "react-router";

export function ScenarioHome(){
    const theme = useMantineTheme();
    let params = useParams();
    let nav = useNavigate();
    let [scenarios,setScenarios] = useLocalStorage<Scenario[]>({key:"medisim-ongoing-scenarios",defaultValue:[]});

    
    useEffect(() => {
        notifications.show(
            {
                title: "Tip !",
                message: <Shortcut symbolA="shift" symbolB="s" description="To see interactive elements"></Shortcut>,
                autoClose: 4000,
                color: 'green',
                position: 'top-right'
            }
        );

        let unsub = eventBus.on("actionResult",({valid,score})=>{
            if(!valid){
                notifications.show(
                    {
                        title: "NO !",
                        message: "That is not the proper move new score "+score,
                        autoClose: 4000,
                        color: 'red',
                        position: 'top-center'
                    }
                );
            }
            
        });

        let unsub2 = eventBus.on("movedToNewNode", ({ nodeTitle }) => {
                notifications.show(
                    {
                        title: "Medical event !",
                        message: nodeTitle,
                        autoClose: 40*nodeTitle.length,
                        color: 'blue',
                        position: 'top-center'
                    }
                );
        });

        const unsub3 = eventBus.on("buttonPressed", ({ action }) => {
            knownAction.current=true;
            const changed = engine.actionHappend(action);
            console.log("I got from engine : "+JSON.stringify(changed));

            setScenarios(prev => {
                const updated = [...prev];
                updated[updated.findIndex(scen=>scen.uuid===params.scenarioId)] = changed;
                return updated;
            });

            
        });

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
            console.log(params.scenarioId);
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

    let knownAction = useRef(false);
    
    useEffect(() => {
        console.log("Done :" +knownAction);
        if (!scenarios || scenarios.length === 0) return;
        if(knownAction.current){
            knownAction.current=false;
            return;
        }

        const copy = structuredClone(scenarios.find(scen=>scen.uuid===params.scenarioId));
        engine.setScenario(copy);

        
        return () => {
            console.log("Ending effect deregistering eventbus");
        };
    }, [params.scenarioId,scenarios]);
    

    return(
        <Box h={"100dvh"}
            style={{
                backgroundImage: "url('/workspace.png')", // Replace with your image path or import
                backgroundSize: "cover",      // Ensures the image fills the entire box
                backgroundPosition: "center",  // Centers the image
                backgroundRepeat: "no-repeat", // Prevents tiling
                backgroundAttachment: "fixed"  // Optional: keeps background static while content scrolls
            }}>
            <Outlet></Outlet>
            
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