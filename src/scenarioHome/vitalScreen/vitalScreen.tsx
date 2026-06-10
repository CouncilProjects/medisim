import { useClickOutside } from '@mantine/hooks';
import eventBus from '../../common/eventBus';
import { Button, Center, Modal, rgba, Stack } from '@mantine/core';
import { useNavigate} from 'react-router';
import { useScenarioContext } from '../scenarioHome';
import { VitalWindow } from '../../common/VitalWindow';
import { OnLineHelp, type PageHelp } from '../../common/onlineHelp';

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
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="Vitals Screen">
                                            <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
                        </Modal>
            <Stack ref={ref} bg={'dark'} p={24} gap="md">
                <VitalWindow label='heart rate' state={context.vitals.hr.state} value={context.vitals.hr.value}></VitalWindow>
                <VitalWindow label='blood preasure' state={context.vitals.bp.state} value={context.vitals.bp.value}></VitalWindow>
                <VitalWindow label='temperature' state={context.vitals.temp.state} value={context.vitals.temp.value}></VitalWindow>
                
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

