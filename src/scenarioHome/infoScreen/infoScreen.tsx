import { Center, rgba, Stack,Text } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useScenarioContext } from '../scenarioHome';

export default function InfoScreen() {
    const nav = useNavigate();
    const ref = useClickOutside(() => nav(-1));
    const outletContext = useScenarioContext();
    
    useEffect(()=>{
        console.log(outletContext.getMedicalSituation());
    },[]);

    return (
        <Center w="100%" h="100%" bg={rgba('dark', 0.6)}>
            <Stack ref={ref} bg={'dark'} p={4} gap="md">
                <Text fw={700} size="lg">Patient Info</Text>
                
                {
                    outletContext.getMedicalSituation().map((event,index)=>{
                        return <Text fw={index==0?600:300}>{index==0?"Current event -> ":null}{event}</Text>
                    })
                }
                
            </Stack>
        </Center>
    );
}