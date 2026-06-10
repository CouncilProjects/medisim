import { Stack, Group, Button, Text, Center, rgba, Box, Modal } from '@mantine/core';
import eventBus from '../../common/eventBus';
import { useNavigate} from 'react-router';
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
        // Only navigate back if the help modal is NOT open
        if (!helpNeeded.value) {
            nav(-1);
        }
    }, 
    ['click'], 
    [document.getElementById("medicineHelpBtn")]
);
    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="Ventilation Screen">
                                <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
            </Modal>
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

const onlineHelp: PageHelp = {
    pageTitle: "Ventilator",
    activeSections: [
        {
            title: "Οθόνη SpO2",
            steps: [
                {
                    stepContent: "Η οθόνη του SpO2 δείχνει τα επίπεδα κορεσμού οξυγόνου στο αίμα του ασθενούς. Όταν η τιμή πέφτει εκτός των φυσιολογικών ορίων, η ένδειξη γίνεται κόκκινη. Αν παραμένει στο κανονικό της χρώμα, σημαίνει ότι η οξυγόνωση είναι καλή."
                }
            ]
        },
        {
            title: "Οθόνη Αναπνευστικού Ρυθμού",
            steps: [
                {
                    stepContent: "Στην οθόνη απεικονίζεται ο αριθμός των αναπνοών ανά λεπτό (RR). Εάν ο ρυθμός πέσει ή ανεβεί επικίνδυνα, η ένδειξη γίνεται κόκκινη για να σας προειδοποιήσει. Διαφορετικά, όλα βαίνουν καλώς."
                }
            ]
        },
        {
            title: "Oxygen Density Controls",
            steps: [
                {
                    stepContent: "Ρυθμίζει το ποσοστό οξυγόνου στο παρεχόμενο μείγμα αέρα (FiO2). Χρησιμοποιήστε τα κουμπιά για να αυξήσετε ή να μειώσετε τη συγκέντρωση ανάλογα με την κατάσταση του ασθενούς."
                }
            ]
        },
        {
            title: "Oxygen Pumps Controls",
            steps: [
                {
                    stepContent: "Ελέγχει τον ρυθμό ροής, τον όγκο ή την πίεση του αέρα. Προσαρμόστε την ένταση της αντλίας για να υποστηρίξετε επαρκώς την αναπνοή του ασθενούς."
                }
            ]
        }
    ]
};