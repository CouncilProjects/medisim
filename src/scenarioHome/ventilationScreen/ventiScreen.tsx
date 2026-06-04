import { Stack, Group, Button, Text, Center, rgba, Box } from '@mantine/core';
import { Actions } from '../../engine/schemas/actionEnum';
import eventBus from '../../common/eventBus';
import { useNavigate} from 'react-router';
import { useFlashOnChange } from '../../hooks/flashOnChange';
import { useClickOutside } from '@mantine/hooks';
import { useScenarioContext } from '../scenarioHome';

function VitalTrend({ state }: { state: string }) {
    let points = "";

    switch (state) {
        case "rising":
            points = "0,55 15,52 30,48 45,40 60,35 75,25 90,15 110,5";
            break;

        case "falling":
            points = "0,5 15,15 30,25 45,35 60,40 75,48 90,52 110,55";
            break;

        default:
            points = "0,30 15,30 30,30 45,30 60,30 75,30 90,30 110,30";
            break;
    }

    const color = state === "stable" ? "#00ff00" : "#ff3333";

    return (
        <svg
            width="120"
            height="60"
            style={{
                background: "#050505",
                border: "1px solid #222",
                borderRadius: "4px",
            }}
        >
            <line x1="0" y1="15" x2="120" y2="15" stroke="#222" />
            <line x1="0" y1="30" x2="120" y2="30" stroke="#222" />
            <line x1="0" y1="45" x2="120" y2="45" stroke="#222" />

            <polyline
                fill="none"
                stroke={color}
                strokeWidth="3"
                points={points}
            />
        </svg>
    );
}

export default function VentilationScreen() {
    const context = useScenarioContext();
    const nav = useNavigate();
    const ref = useClickOutside(() => nav(-1));

    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Stack ref={ref} bg={'dark'} p={24} gap="md">
                <Box p="md" bg="black"style={{border: `2px solid ${context.vitals.spo2.state === "stable" ? "green" : "red"}`,borderRadius: 8,minWidth: 300,}}>
                    <Text size="xs" c="dimmed">
                        SpO₂
                    </Text>

                    <Group justify="space-between" align="center">
                        <Text size="3rem" fw={700} c={context.vitals.spo2.state === "stable" ? "green" : "red"}>
                            {context.vitals.spo2.value}%
                        </Text>

                        <VitalTrend state={context.vitals.spo2.state} />
                    </Group>

                    <Text c={context.vitals.spo2.state === "stable" ? "green" : "red"} fw={700}>
                        {context.vitals.spo2.state.toUpperCase()}
                    </Text>
                </Box>

                <Box p="md" bg="black" style={{border: `2px solid ${context.vitals.rr.state === "stable" ? "green" : "red"}`,borderRadius: 8,minWidth: 300,}}>
                    <Text size="xs" c="dimmed">
                        RESPIRATORY RATE
                    </Text>

                    <Group justify="space-between" align="center">
                        <Text size="3rem" fw={700} c={context.vitals.rr.state === "stable" ? "green" : "red"}>
                            {context.vitals.rr.value}
                        </Text>

                    <VitalTrend state={context.vitals.rr.state} />
                    </Group>

                    <Text c={context.vitals.rr.state === "stable" ? "green" : "red"} fw={700}>
                        {context.vitals.rr.state.toUpperCase()}
                    </Text>
                </Box>

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