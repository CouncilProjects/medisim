import { useEffect } from 'react';
import {makeHotspot, OverlayImage} from './common/overlayHotspot';
import { notifications } from '@mantine/notifications';
import { Box, Group, Kbd, useMantineTheme } from '@mantine/core';


export default function TestImage(){
    const theme = useMantineTheme()


    useEffect(()=>{
        notifications.show(
            {
                title:"Tip !",
                message:<Shortcut symbolA="shift" symbolB="s" description="To see interactive elements"></Shortcut>,
                autoClose:4000,
                color:'green',
                position:'top-right'
            }
        )
    },[]);

    return(
        <Box p={0} h={"100dvh"}>
            <OverlayImage src='/workspace.png'
                hotspots={
                    [
                        makeHotspot(0.25,0.28, (() => { console.log("Vitals pressed") }), "Vitals", 215, 175),
                        makeHotspot(0.22,0.70, (() => { console.log("patient pressed") }), "Patient info", 150, 190),
                        makeHotspot(0.76,0.35, (() => { console.log("Vent pressed") }), "Ventilation", 180, 180),
                        makeHotspot(0.90,0.65, (() => { console.log("med pressed") }), "Medicine cabinet", 240, 400),
                        makeHotspot(0.61,0.31, (() => { console.log("doctor pressed") }), "Doctor call", 50, 70)
                    ]
                }
            ></OverlayImage>
        </Box>
    )
}

function Shortcut({ symbolA, symbolB, description }: { symbolA: string; symbolB:string; description: string }) {
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