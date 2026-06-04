import { useClickOutside } from '@mantine/hooks';
import eventBus from '../../common/eventBus';
import { Actions } from '../../engine/schemas/actionEnum';
import { Button, Center, rgba, Stack,Text, Group,Box } from '@mantine/core';
import { useNavigate} from 'react-router';
import { useFlashOnChange } from '../../hooks/flashOnChange';
import { useScenarioContext } from '../scenarioHome';

function getVitalColor(state: string) {
    return state === "stable" ? "green" : "red";
}

function VitalStatus({ state }: { state: string }) {
    const color =
        state === "stable"
            ? "green"
            : "red";

    return (
        <Group gap="xs">
            <Box
                w={20}
                h={20}
                bg={color}
                style={{ borderRadius: "50%" }}
            />

            <Text c={color} fw={700}>
                {state.toUpperCase()}
            </Text>
        </Group>
    );
}

export default function VitalScreen() {
    const context = useScenarioContext();
    const nav = useNavigate();

    const hrFlash = useFlashOnChange(context.vitals.hr.value,500);

    const bpFlash = useFlashOnChange(context.vitals.bp.value, 500);

    const tempFlash = useFlashOnChange(context.vitals.temp.value, 500);

    const ref = useClickOutside(() => nav(-1));
    

    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Stack ref={ref} bg={'dark'} p={24} gap="md">
                <Box p="md" bg="black" style={{border: `2px solid ${getVitalColor(context.vitals.hr.state)}`,borderRadius: 8,minWidth: 350,}}>
                    <Text size="xs" c="dimmed">
                        HEART RATE
                    </Text>

                    <Group justify="space-between" align="center">
                        <Text size="3rem" fw={700}c={getVitalColor(context.vitals.hr.state)}>
                            {context.vitals.hr.value}
                        </Text>

                        <VitalTrend state={context.vitals.hr.state} />
                    </Group>

                    <VitalStatus state={context.vitals.hr.state} />
                </Box>

                <Box p="md" bg="black" style={{border: `2px solid ${getVitalColor(context.vitals.bp.state)}`,borderRadius: 8,minWidth: 350,}}>
                    <Text size="xs" c="dimmed">
                        BLOOD PRESSURE
                    </Text>

                    <Group justify="space-between" align="center">
                        <Text size="3rem" fw={700} c={getVitalColor(context.vitals.bp.state)}>
                            {context.vitals.bp.value}
                        </Text>

                        <VitalTrend state={context.vitals.bp.state} />
                    </Group>

                        <VitalStatus state={context.vitals.bp.state} />
                </Box>

                <Box p="md" bg="black" style={{border: `2px solid ${getVitalColor(context.vitals.temp.state)}`, borderRadius: 8, minWidth: 350,}}>
                    <Text size="xs" c="dimmed">
                        TEMPERATURE
                    </Text>

                    <Group justify="space-between" align="center">
                        <Text size="3rem" fw={700} c={getVitalColor(context.vitals.temp.state)}>
                            {context.vitals.temp.value}
                        </Text>
                        <VitalTrend state={context.vitals.temp.state} />
                    </Group>
                    <VitalStatus state={context.vitals.temp.state} />
                </Box>
                
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