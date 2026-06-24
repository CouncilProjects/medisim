import { useClickOutside } from '@mantine/hooks';
import eventBus from '../../common/eventBus';
import { Button, Center, Modal, rgba, Stack, Paper, Title, Group, Divider } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useScenarioContext } from '../scenarioHome';
import { VitalWindow } from '../../common/VitalWindow';
import { OnLineHelp, type PageHelp } from '../../common/onlineHelp';
import { IconBolt, IconHeartbeat } from '@tabler/icons-react'; // Recommended addition


export default function VitalScreen() {
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
        <Center w="100%" h="100%" bg={rgba('dark.9', 0.7)}>
            <Modal 
                opened={helpNeeded.value} 
                onClose={helpNeeded.toggle} 
                title={<Title order={4}>Vitals Screen Help</Title>}
                centered
                size="lg"
            >
                <OnLineHelp pageHelp={onlineHelp} />
            </Modal>

            {/* Wrapped the Stack in a Paper component to create a distinct floating card */}
            <Paper ref={ref} bg="dark.7" p="xl" radius="md" shadow="xl" withBorder w={{ base: '90%', sm: 400 }}>
                <Stack gap="lg">
                    {/* Header Section */}
                    <Group justify="space-between" align="center">
                        <Title order={3} c="white">Patient Vitals</Title>
                        <IconHeartbeat color="#fa5252" size={28} />
                    </Group>
                    
                    <Divider color="dark.5" />

                    {/* Vitals Section */}
                    <Stack gap="sm">
                        <VitalWindow label='Heart Rate' state={context.vitals.hr.state} value={context.vitals.hr.value} />
                        {/* Fixed typo: blood preasure -> blood pressure */}
                        <VitalWindow label='Blood Pressure' state={context.vitals.bp.state} value={context.vitals.bp.value} />
                        <VitalWindow label='Temperature' state={context.vitals.temp.state} value={context.vitals.temp.value} />
                    </Stack>
                    
                    <Divider color="dark.5" />

                    {/* Actions Section */}
                    <Group grow>
                        <Button 
                            color="red" 
                            size="md"
                            leftSection={<IconBolt size={20} />}
                            onClick={() => eventBus.emit("buttonPressed", { action: "shock" })}
                        >
                            Shock
                        </Button>
                        <Button 
                            color="red" 
                            variant="light" 
                            size="md"
                            leftSection={<IconBolt size={20} />}
                            onClick={() => eventBus.emit("buttonPressed", { action: "shockLight" })}
                        >
                            Shock Light
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </Center>
    );
}

const onlineHelp: PageHelp = {
    pageTitle: "Vitals Screen",
    activeSections: [
        {
            title: "Heart Rate (Καρδιακός Ρυθμός)",
            steps: [
                {
                    stepContent: "Η οθόνη δείχνει τους καρδιακούς παλμούς του ασθενούς. Αν ο ρυθμός πέσει ή ανεβεί εκτός των φυσιολογικών ορίων, η ένδειξη γίνεται κόκκινη. Διαφορετικά, όλα βαίνουν καλώς."
                }
            ]   
        },
        {
            title: "Blood Pressure (Αρτηριακή Πίεση)",
            steps: [
                {
                    stepContent: "Απεικονίζει την αρτηριακή πίεση. Όταν η πίεση πέσει ή ανεβεί επικίνδυνα, η ένδειξη γίνεται κόκκινη για να σας προειδοποιήσει. Αν παραμένει στο κανονικό της χρώμα, σημαίνει ότι η πίεση είναι σε καλά επίπεδα."
                }
            ]
        },
        {
            title: "Temperature (Θερμοκρασία)",
            steps: [
                {
                    stepContent: "Δείχνει τη θερμοκρασία του σώματος του ασθενούς. Εάν η θερμοκρασία αυξηθεί ή μειωθεί σημαντικά, η ένδειξη θα γίνει κόκκινη."
                }
            ]
        },
        {
            title: "Shock & Shock Light",
            steps: [
                {
                    stepContent: "Κουμπιά για τη χορήγηση απινίδωσης. Χρησιμοποιήστε το 'Shock' για κανονική ένταση και το 'Shock Light' για πιο ήπια παρέμβαση, ανάλογα με το επείγον της κατάστασης του ασθενούς."
                }
            ]
        }
    ]
};