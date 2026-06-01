import { Stack, Group, Button, Text, Center, rgba } from '@mantine/core';
import { Actions } from '../../engine/schemas/actionEnum';
import eventBus from '../../common/eventBus';
import { useNavigate} from 'react-router';
import { useFlashOnChange } from '../../hooks/flashOnChange';
import { useClickOutside } from '@mantine/hooks';
import { useScenarioContext } from '../scenarioHome';

export default function VentilationScreen() {
    const context = useScenarioContext();
    const nav = useNavigate();

    const spo2Flash = useFlashOnChange(context.vitals.spo2.value,500);

    const rrFlash = useFlashOnChange(context.vitals.rr.value, 500);

    const ref = useClickOutside(() => nav(-1));

    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Stack ref={ref} bg={'dark'} p={4} gap="md">
                <Text fw={700} size="lg">Ventilation Controls</Text>
                <Text fw={300} size="md" bg={spo2Flash?'orange':'transparent'}>SPo2 : {context.vitals.spo2.value} currently {context.vitals.spo2.state}</Text>
                <Text fw={300} size="md" bg={rrFlash ? 'orange' : 'transparent'}>Respitory rate : {context.vitals.rr.value} currently {context.vitals.rr.state}</Text>
                <Group grow>
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxygenDensityUp })}>
                        Oxygen Density Up
                    </Button>
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxygenDensityDown })}>
                        Oxygen Density Down
                    </Button>
                </Group>

                <Group grow>
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxyPumpsUp })}>
                        Oxy Pumps Up
                    </Button>
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxyPumpsDown })}>
                        Oxy Pumps Down
                    </Button>
                </Group>
            </Stack>
        </Center>
    );
}