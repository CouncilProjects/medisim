import { Stack, Group, Button, Text, Center, rgba, Box } from '@mantine/core';
import eventBus from '../../common/eventBus';
import { useNavigate} from 'react-router';
import { useClickOutside } from '@mantine/hooks';
import { useScenarioContext } from '../scenarioHome';
import { VitalWindow } from '../../common/VitalWindow';

export default function VentilationScreen() {
    const context = useScenarioContext();
    const nav = useNavigate();
    const ref = useClickOutside(() => nav(-1));

    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Stack ref={ref} bg={'dark'} p={24} gap="md">
                <VitalWindow label='SpO₂' state={context.vitals.spo2.state} value={context.vitals.spo2.value}></VitalWindow>
                <VitalWindow label='RESPIRATORY RATE' state={context.vitals.rr.state} value={context.vitals.rr.value}></VitalWindow>

                <Box p="md" bg="black" style={{border: "2px solid #333", borderRadius: 8,}}>
                    <Text c="dimmed" size="xs">
                        VENTILATION CONTROLS
                    </Text>

                    <Group grow mt="sm">
                        <Button onClick={() => eventBus.emit("buttonPressed", { action: "oxygenDensityUp" })}>
                            Oxygen Density Up
                        </Button>

                        <Button onClick={() => eventBus.emit("buttonPressed", { action: "oxygenDensityDown" })}>
                            Oxygen Density Down
                        </Button>
                    </Group>

                    <Group grow mt="sm">
                        <Button onClick={() => eventBus.emit("buttonPressed", { action: "oxyPumpsUp" })}>
                            Oxy Pumps Up
                        </Button>

                        <Button onClick={() => eventBus.emit("buttonPressed", { action: "oxyPumpsDown" })}>
                            Oxy Pumps Down
                        </Button>
                    </Group>
                </Box>
            </Stack>
        </Center>
    );
}