import { Center, Stack, Text, Paper, ScrollArea, Box, Group, Badge, Modal } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useScenarioContext } from '../scenarioHome';
import { OnLineHelp, type PageHelp } from '../../common/onlineHelp';

export default function InfoScreen() {
    const nav = useNavigate();
    const { helpNeeded } = useScenarioContext();
    const ref = useClickOutside(
        () => {
            // Only navigate back if the help modal is NOT open
            if (!helpNeeded.value) {
                nav(-1);
            }
        }, 
        ['click'], 
        [document.getElementById("medicineHelpBtn")]
    );
    const outletContext = useScenarioContext();
    const patient = outletContext.patient;
    
    return (
        <Center
            w="100%"
            h="100%"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            }}
        >
            <Modal 
                opened={helpNeeded.value} 
                onClose={helpNeeded.toggle} 
                title="Patient Info Help" 
                zIndex={2000}
            >
                <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
            </Modal>

            <Paper
                ref={ref}
                radius="md"
                shadow="xl"
                maw={720} 
                w="95%"
                withBorder
                style={{
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    backgroundColor: '#1a2432',
                    border: '1px solid #3a5375',
                }}
            >
                {/* EHR-style header */}
                <Box
                    style={{
                        backgroundColor: '#0f1722',
                        padding: '16px 24px',
                        borderBottom: '3px solid #c4813e',
                    }}
                >
                    <Group justify="space-between" align="center">
                        <Group gap="sm" align="center">
                            {/* Medical cross */}
                            <Box style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
                                <Box style={{
                                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                                    width: 6, height: 20, backgroundColor: '#c4813e', borderRadius: 2,
                                }} />
                                <Box style={{
                                    position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)',
                                    width: 20, height: 6, backgroundColor: '#c4813e', borderRadius: 2,
                                }} />
                            </Box>
                            <Stack gap={2}>
                                <Text fw={600} size="lg" style={{ color: '#deeaf7', letterSpacing: '0.5px' }}>
                                    Patient Medical Record
                                </Text>
                                <Text size="xs" style={{
                                    color: 'rgba(222,234,247,0.5)',
                                    letterSpacing: '1.4px',
                                    textTransform: 'uppercase',
                                    fontFamily: 'monospace',
                                }}>
                                    Confidential · Scenario Data
                                </Text>
                            </Stack>
                        </Group>
                        <Badge
                            size="sm"
                            variant="outline"
                            style={{
                                borderColor: '#c4813e',
                                color: '#c4813e',
                                letterSpacing: '1px',
                                fontFamily: 'monospace',
                            }}
                        >
                            RESTRICTED
                        </Badge>
                    </Group>
                </Box>

                <ScrollArea style={{ flex: 1 }} offsetScrollbars>
                    <Stack gap={0}>
                        {!patient ? (
                            <Text c="dimmed" ta="center" py="xl" style={{ color: '#8ea4bc' }}>
                                No patient data is available for this scenario.
                            </Text>
                        ) : (
                            Object.entries(patient).map(([key, value], index) => {
                                // Skip rendering the sensitivities key entirely
                                if (key === 'sensitivities') return null;

                                const isDarkRow = index % 2 === 0;
                                const rowBg = isDarkRow ? '#1a2432' : '#223040'; 
                                
                                return (
                                    <Box
                                        key={key}
                                        style={{
                                            borderLeft: '4px solid #2b5797',
                                            padding: '12px 20px',
                                            backgroundColor: rowBg,
                                            borderBottom: '1px solid #3a5375',
                                        }}
                                    >
                                        <Text
                                            tt="uppercase"
                                            size="xs"
                                            fw={600}
                                            mb={4}
                                            style={{
                                                color: '#8ea4bc', 
                                                letterSpacing: '1.2px',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {key}
                                        </Text>
                                        <Text
                                            size="md"
                                            fw={500}
                                            style={{
                                                color: '#deeaf7', 
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {Array.isArray(value)
                                                ? value.join(', ')
                                                : typeof value === 'object' && value !== null
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                        </Text>
                                    </Box>
                                );
                            })
                        )}
                    </Stack>
                </ScrollArea>

                <Box
                    style={{
                        borderTop: '1px solid #3a5375',
                        backgroundColor: '#0f1722',
                        padding: '10px 16px',
                    }}
                >
                    <Text
                        ta="center"
                        style={{
                            color: '#5c7899',
                            fontFamily: 'monospace',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            fontSize: 10,
                        }}
                    >
                        For Training Purposes Only
                    </Text>
                </Box>
            </Paper>
        </Center>
    );
}



const onlineHelp: PageHelp = {
    pageTitle: "Patient info",
    activeSections: [
        {
            title: "Οθόνη Πληροφοριών Ασθενούς",
            steps: [
                {
                    stepContent: "Σε αυτή την οθόνη παρουσιάζεται το πλήρες ιατρικό προφίλ του ασθενούς, συμπεριλαμβανομένων των βασικών δημογραφικών του στοιχείων (ηλικία, φύλο) και του γενικού ιατρικού του ιστορικού."
                }
            ]
        }
    ]
};