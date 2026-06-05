import { Box,Text, Group, useMantineTheme } from "@mantine/core";

interface VitalWindowProps {
    state: string,
    value: number,
    label:string
}

export function VitalWindow(props: VitalWindowProps) {

    return (
        <Box p="md" bg="black" style={{ border: `2px solid ${getVitalColor(props.state)}`, borderRadius: 8, minWidth: 350, }}>
            <Text size="xs" c="dimmed">
                {props.label.toUpperCase()}
            </Text>

            <Group justify="space-between" align="center">
                <Text size="3rem" fw={700} c={getVitalColor(props.state)}>
                    {props.value}
                </Text>

                <VitalTrend state={props.state} />
            </Group>

            <VitalStatus state={props.state} />
        </Box>
    )
}

function VitalTrend({ state }: { state: string }) {
    const theme = useMantineTheme();
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

    const color = state === "stable" ? theme.colors.green[5] : theme.colors.red[5];

    return (
        <svg
            width="120"
            height="60"
            style={{
                background: theme.colors.dark[9],
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