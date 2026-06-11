import { Center, rgba, Stack, Text, Box } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useScenarioContext } from '../scenarioHome';

export default function InfoScreen() {
    const nav = useNavigate();
    const ref = useClickOutside(() => nav(-1));
    const outletContext = useScenarioContext();

    const patient = outletContext.patient;

    return (
        <Center w="100%" h="100%" bg={rgba('dark', 0.6)}>
            <Stack ref={ref} bg="dark" p={24} gap="md" maw={420} w="90%" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <Text fw={700} size="lg">Patient Info</Text>

                {!patient ? (
                    <Text c="dimmed">No patient data is available for this scenario.</Text>
                ) : (
                    Object.entries(patient).map(([key, value]) => (
                        <Box key={key} p="sm" bg="black" style={{ borderRadius: 8, border: '1px solid #333' }}>
                            <Text fw={600} tt="capitalize" size="sm" c="cyan.2">{key}</Text>
                            <Text size="sm" c="gray.2">
                                {Array.isArray(value)
                                    ? value.join(', ')
                                    : typeof value === 'object' && value !== null
                                        ? JSON.stringify(value)
                                        : String(value)}
                            </Text>
                        </Box>
                    ))
                )}
            </Stack>
        </Center>
    );
}