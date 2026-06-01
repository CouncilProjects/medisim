import { useClickOutside } from '@mantine/hooks';
import eventBus from '../../common/eventBus';
import { Actions } from '../../engine/schemas/actionEnum';
import { Button, Center, rgba, Stack,Text } from '@mantine/core';
import { useNavigate} from 'react-router';
import { useFlashOnChange } from '../../hooks/flashOnChange';
import { useScenarioContext } from '../scenarioHome';

export default function VitalScreen() {
    const context = useScenarioContext();
    const nav = useNavigate();

    const hrFlash = useFlashOnChange(context.vitals.hr.value,500);

    const bpFlash = useFlashOnChange(context.vitals.bp.value, 500);

    const tempFlash = useFlashOnChange(context.vitals.temp.value, 500);

    const ref = useClickOutside(() => nav(-1));
    

    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Stack ref={ref} bg={'dark'} p={4} gap="md">
                <Text fw={700} size="lg">Vitals & shock Controls</Text>
                <Text fw={300} size="md" bg={hrFlash ? 'orange' : 'transparent'}>Heart rate : {context.vitals.hr.value} currently {context.vitals.hr.state}</Text>
                <Text fw={300} size="md" bg={bpFlash ? 'orange' : 'transparent'}>Temprature : {context.vitals.temp.value} currently {context.vitals.temp.state}</Text>
                <Text fw={300} size="md" bg={tempFlash ? 'orange' : 'transparent'}>Blood preasure : {context.vitals.bp.value} currently {context.vitals.bp.state}</Text>
                <Button color="red" onClick={() => eventBus.emit("buttonPressed", { action: Actions.shock })}>
                    Shock
                </Button>
                <Button color="red" variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.shockLight })}>
                    Shock Light
                </Button>
            </Stack>
        </Center>
    );
}