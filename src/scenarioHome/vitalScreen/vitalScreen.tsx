import { useClickOutside } from '@mantine/hooks';
import eventBus from '../../common/eventBus';
import { Button, Center, rgba, Stack } from '@mantine/core';
import { useNavigate} from 'react-router';
import { useScenarioContext } from '../scenarioHome';
import { VitalWindow } from '../../common/VitalWindow';


export default function VitalScreen() {
    const context = useScenarioContext();
    const nav = useNavigate();

    const ref = useClickOutside(() => nav(-1));
    

    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Stack ref={ref} bg={'dark'} p={24} gap="md">
                <VitalWindow label='heart rate' state={context.vitals.hr.state} value={context.vitals.hr.value}></VitalWindow>
                <VitalWindow label='blood preasure' state={context.vitals.bp.state} value={context.vitals.bp.value}></VitalWindow>
                <VitalWindow label='temperature' state={context.vitals.temp.state} value={context.vitals.temp.value}></VitalWindow>
                
                <Button color="red" onClick={() => eventBus.emit("buttonPressed", { action: "shock" })}>
                    Shock
                </Button>
                <Button color="red" variant="light" onClick={() => eventBus.emit("buttonPressed", { action: "shockLight" })}>
                    Shock Light
                </Button>
            </Stack>
        </Center>
    );
}


