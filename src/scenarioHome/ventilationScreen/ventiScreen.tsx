import {
    Stack,
    Group,
    Button,
    Text,
    Center,
    rgba,
    Box,
    Modal,
    SimpleGrid,
} from '@mantine/core';
import eventBus from '../../common/eventBus';
import { useNavigate } from 'react-router';
import { useClickOutside } from '@mantine/hooks';
import { useScenarioContext } from '../scenarioHome';
import { VitalWindow } from '../../common/VitalWindow';
import { OnLineHelp, type PageHelp } from '../../common/onlineHelp';

export default function VentilationScreen() {
    const context = useScenarioContext();
    const nav = useNavigate();
    const { helpNeeded } = useScenarioContext();

    const ref = useClickOutside(
        () => {
            if (!helpNeeded.value) {
                nav(-1);
            }
        },
        ['click'],
        [document.getElementById('medicineHelpBtn')]
    );

    return (
        <Center w="100%" h="100%" bg={rgba('dark', 0.6)}>
            <Modal
                opened={helpNeeded.value}
                onClose={helpNeeded.toggle}
                title="Ventilation Screen"
                size="lg"
            >
                <OnLineHelp pageHelp={onlineHelp} />
            </Modal>

            <Stack
                ref={ref}
                bg="dark.8"
                p={32}
                gap="lg"
                maw={900}
                w="90%"
                style={{
                    borderRadius: 12,
                    border: '1px solid #333',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                }}
            >
                <Box>
                    <Text fw={700} size="xl">
                        Ventilator Control Panel
                    </Text>

                    <Text size="sm" c="dimmed">
                        Oxygenation and respiratory monitoring
                    </Text>
                </Box>

                <SimpleGrid cols={2} spacing="md">
                    <VitalWindow
                        label="SpO₂"
                        state={context.vitals.spo2.state}
                        value={context.vitals.spo2.value}
                    />

                    <VitalWindow
                        label="RESPIRATORY RATE"
                        state={context.vitals.rr.state}
                        value={context.vitals.rr.value}
                    />
                </SimpleGrid>

                <Box
                    p="xl"
                    bg="dark.7"
                    style={{
                        border: '1px solid #444',
                        borderRadius: 12,
                    }}
                >
                    <Text fw={600} size="md">
                        Ventilation Controls
                    </Text>

                    <Text c="dimmed" size="sm" mb="md">
                        Adjust oxygen concentration and pump output.
                    </Text>

                    <Group grow>
                        <Button
                            color="blue"
                            onClick={() =>
                                eventBus.emit('buttonPressed', {
                                    action: 'oxygenDensityUp',
                                })
                            }
                        >
                            Increase O₂ Density
                        </Button>

                        <Button
                            variant="light"
                            color="blue"
                            onClick={() =>
                                eventBus.emit('buttonPressed', {
                                    action: 'oxygenDensityDown',
                                })
                            }
                        >
                            Decrease O₂ Density
                        </Button>
                    </Group>

                    <Group grow mt="sm">
                        <Button
                            color="green"
                            onClick={() =>
                                eventBus.emit('buttonPressed', {
                                    action: 'oxyPumpsUp',
                                })
                            }
                        >
                            Increase Pump Rate
                        </Button>

                        <Button
                            variant="light"
                            color="green"
                            onClick={() =>
                                eventBus.emit('buttonPressed', {
                                    action: 'oxyPumpsDown',
                                })
                            }
                        >
                            Decrease Pump Rate
                        </Button>
                    </Group>
                </Box>
            </Stack>
        </Center>
    );
}

const onlineHelp: PageHelp = {
    pageTitle: 'Ventilator',
    activeSections: [
        {
            title: 'Οθόνη SpO2',
            steps: [
                {
                    stepContent:
                        'Η οθόνη του SpO2 δείχνει τα επίπεδα κορεσμού οξυγόνου στο αίμα του ασθενούς. Όταν η τιμή πέφτει εκτός των φυσιολογικών ορίων, η ένδειξη γίνεται κόκκινη. Αν παραμένει στο κανονικό της χρώμα, σημαίνει ότι η οξυγόνωση είναι καλή.',
                },
            ],
        },
        {
            title: 'Οθόνη Αναπνευστικού Ρυθμού',
            steps: [
                {
                    stepContent:
                        'Στην οθόνη απεικονίζεται ο αριθμός των αναπνοών ανά λεπτό (RR). Εάν ο ρυθμός πέσει ή ανεβεί επικίνδυνα, η ένδειξη γίνεται κόκκινη για να σας προειδοποιήσει. Διαφορετικά, όλα είναι καλά.',
                },
            ],
        },
        {
            title: 'Oxygen Density Controls',
            steps: [
                {
                    stepContent:
                        'Ρυθμίζει το ποσοστό οξυγόνου στο παρεχόμενο μείγμα αέρα (FiO2). Χρησιμοποιήστε τα κουμπιά για να αυξήσετε ή να μειώσετε τη συγκέντρωση ανάλογα με την κατάσταση του ασθενούς.',
                },
            ],
        },
        {
            title: 'Oxygen Pumps Controls',
            steps: [
                {
                    stepContent:
                        'Ελέγχει τον ρυθμό ροής, τον όγκο ή την πίεση του αέρα. Προσαρμόστε την ένταση της αντλίας για να υποστηρίξετε επαρκώς την αναπνοή του ασθενούς.',
                },
            ],
        },
    ],
};