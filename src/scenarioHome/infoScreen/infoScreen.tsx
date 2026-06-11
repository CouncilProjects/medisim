import { Center, Stack, Text, Paper, ScrollArea, Box, Group, Badge, SimpleGrid } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useScenarioContext } from '../scenarioHome';

// 1. Lock in the exact strings from your schema
const ALL_SENSITIVITIES = ["painkillers", "bloodpressure", "temp"] as const;

// 2. Create a mapping dictionary for human-readable labels
const SENSITIVITY_LABELS: Record<string, string> = {
    "painkillers": "Painkillers",
    "bloodpressure": "Blood Pressure Medicine",
    "temp": "Temperature Variations" // Feel free to change this to whatever sounds best!
};

export default function InfoScreen() {
    const nav = useNavigate();
    const ref = useClickOutside(() => nav(-1));
    const outletContext = useScenarioContext();
    const patient = outletContext.patient;

    return (
        <Center
            w="100%"
            h="100%"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(6px)',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
            }}
        >
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
                                const isDarkRow = index % 2 === 0;
                                const rowBg = isDarkRow ? '#1a2432' : '#223040'; 
                                
                                // --- CUSTOM SENSITIVITIES CHECKLIST RENDERER ---
                                if (key === 'sensitivities') {
                                    const activeSensitivities = Array.isArray(value) ? value : [];
                                    
                                    return (
                                        <Box
                                            key={key}
                                            style={{
                                                borderLeft: '4px solid #c4813e', 
                                                padding: '16px 20px',
                                                backgroundColor: rowBg,
                                                borderBottom: '1px solid #3a5375',
                                            }}
                                        >
                                            <Text
                                                tt="uppercase"
                                                size="xs"
                                                fw={600}
                                                mb={12}
                                                style={{ color: '#8ea4bc', letterSpacing: '1.2px', fontFamily: 'monospace' }}
                                            >
                                                Sensitivities Checklist
                                            </Text>
                                            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                                                {ALL_SENSITIVITIES.map((sense) => {
                                                    const hasSense = activeSensitivities.includes(sense);
                                                    
                                                    // 3. Look up the human-readable label
                                                    const displayLabel = SENSITIVITY_LABELS[sense] || sense; 

                                                    return (
                                                        <Group gap="sm" key={sense} wrap="nowrap">
                                                            <Box style={{
                                                                width: 18, 
                                                                height: 18,
                                                                border: `2px solid ${hasSense ? '#c4813e' : '#5c7899'}`,
                                                                backgroundColor: hasSense ? '#c4813e' : 'transparent',
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                justifyContent: 'center',
                                                                borderRadius: 4,
                                                                transition: 'all 0.2s ease'
                                                            }}>
                                                                {hasSense && <Text size="12px" fw={900} style={{ color: '#132843', lineHeight: 1 }}>✓</Text>}
                                                            </Box>
                                                            <Text 
                                                                size="sm" 
                                                                fw={hasSense ? 600 : 400} 
                                                                style={{ 
                                                                    color: hasSense ? '#deeaf7' : '#738baf', 
                                                                    fontFamily: 'monospace',
                                                                }}
                                                            >
                                                                {/* 4. Render the nice label instead of the raw string */}
                                                                {displayLabel}
                                                            </Text>
                                                        </Group>
                                                    );
                                                })}
                                            </SimpleGrid>
                                        </Box>
                                    );
                                }

                                // --- DEFAULT RENDERER FOR OTHER PROPERTIES ---
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