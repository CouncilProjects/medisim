import { useEffect } from 'react';
import {makeHotspot, OverlayImage} from './common/overlayHotspot';
import { notifications } from '@mantine/notifications';
import { Box, Group, Kbd } from '@mantine/core';


export default function TestImage(){

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
        <Box w={'100dvw'} h={'100dvh'} m={0} style={{overflow:'hidden'}}>
            <OverlayImage src='/workspace.png'
                hotspots={
                    [
                        makeHotspot(25, 20, (() => { console.log("Vitals pressed") }), "Vitals", 200, 200),
                        makeHotspot(22, 77, (() => { console.log("patient pressed") }), "Patient info", 145, 260),
                        makeHotspot(76, 30, (() => { console.log("Vent pressed") }), "Ventilation", 190, 230),
                        makeHotspot(90, 70, (() => { console.log("med pressed") }), "Medicine cabinet", 200, 455),
                        makeHotspot(62, 23, (() => { console.log("doctor pressed") }), "Doctor call", 50, 70)
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