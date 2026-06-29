import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Center, Paper, Text, Checkbox, Select, Textarea, Button, Stack, Group, Alert, MantineThemeProvider } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import eventBus from './common/eventBus';
import engine from './engine/engine';
import type { Assessment } from './engine/types';

export const Actions = {
    timeout: "Λήξη χρόνου (Timeout Triggered)",
    shockLight: "Εφαρμογή ελαφρού σοκ (Applied light shock)",
    shock: "Εφαρμογή σοκ (Applied shock)",
    oxygenDensityUp: "Αύξηση πυκνότητας οξυγόνου (Increased oxygen density)",
    oxygenDensityDown: "Μείωση πυκνότητας οξυγόνου (Decreased oxygen density)",
    oxyPumpsUp: "Αύξηση ρυθμού αντλίας οξυγόνου (Increased oxygen pump rate)",
    oxyPumpsDown: "Μείωση ρυθμού αντλίας οξυγόνου (Decreased oxygen pump rate)",
    painkillers: "Χορήγηση παυσίπονων (Administered painkillers)",
    painkillersLight: "Χορήγηση ελαφρών παυσίπονων (Administered light painkillers)",
    bloodPressureUp: "Αύξηση αρτηριακής πίεσης (Increased blood pressure)",
    bloodPressureDown: "Μείωση αρτηριακής πίεσης (Decreased blood pressure)",
    bloodPressureUpLight: "Ελαφρά αύξηση αρτηριακής πίεσης (Slightly increased blood pressure)",
    bloodPressureDownLight: "Ελαφρά μείωση αρτηριακής πίεσης (Slightly decreased blood pressure)",
    tempUp: "Αύξηση θερμοκρασίας σώματος (Increased body temperature)",
    tempDown: "Μείωση θερμοκρασίας σώματος (Decreased body temperature)",
    tempUpLight: "Ελαφρά αύξηση θερμοκρασίας σώματος (Slight increase in body temperature)",
    tempDownLight: "Ελαφρά μείωση θερμοκρασίας σώματος (Slight decrease in body temperature)",
    callDoctor: "Κλήση γιατρού (Called doctor)",
    doTests: "Εκτέλεση διαγνωστικών εξετάσεων (Performed diagnostic tests)",
    wait: "Αναμονή / παρακολούθηση ασθενούς (Waited / monitored patient)",
    bloodTest: "Εκτέλεση αιματολογικής εξέτασης (Performed blood test)",
    cholesterolTest: "Εκτέλεση εξέτασης χοληστερίνης (Performed cholesterol test)",
    doTest: "Εκτέλεση γενικής εξέτασης (Performed general test)",
} as const;

export type Action = typeof Actions[keyof typeof Actions];
export type ActionKey = keyof typeof Actions;
export const ACTION_KEYS = Object.keys(Actions) as ActionKey[];

export default function FormScreen() {
    const nav = useNavigate();
    
    const [allergies, setAllergies] = useState<string[]>([]);
    const [action, setAction] = useState<string | null>(null);
    const [reasoning, setReasoning] = useState('');
    const [notes, setNotes] = useState('');

    const [errors, setErrors] = useState({ allergies: false, action: false, reasoning: false });
    const [isSuccess, setIsSuccess] = useState(false);

    
    useEffect(() => {
        
        window.history.pushState(null, "", window.location.href);

        
        const handlePopState = () => {
            
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
  

    const ref = useClickOutside(() => {});
    
    const allergyOptions = [
        { value: 'painkillers', label: 'Παυσίπονα (Painkillers)' },
        { value: 'ibuprofen', label: 'Ιβουπροφαίνη (Ibuprofen)' },
        { value: 'amphotericin_b', label: 'Αμφοτερικίνη Β (Amphotericin B)' },
        { value: 'none', label: 'Κανένα (None)' }
    ];

    const actionOptions = Object.entries(Actions).map(([key, value]) => ({
        value: key,
        label: value
    }));

    const handleSubmit = () => {
        setErrors({ allergies: false, action: false, reasoning: false });
        setIsSuccess(false);

        let hasError = false;
        const newErrors = { allergies: false, action: false, reasoning: false };

        if (allergies.length === 0) {
            newErrors.allergies = true;
            hasError = true;
        }
        if (!action) {
            newErrors.action = true;
            hasError = true;
        }
        if (!reasoning.trim()) {
            newErrors.reasoning = true;
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        const currentNode = engine.scenario?.nodes?.[engine.scenario.current_node];
        const assessment: Assessment = {
            nodeID: currentNode?.id ?? "",
            formID: currentNode?.form ?? "",
            value: {
                sensitivities: allergies,
                last_action: action ?? "",
                reason: reasoning.trim(),
                notes: notes.trim()
            }
        };

        if (engine.scenario) {
            engine.scenario.state.assessment.push(assessment);
        }

        setIsSuccess(true);
        eventBus.emit("buttonPressed", { action: "submitAssessment" });
        eventBus.emit("assessmentSubmitted", { assessment });

        setTimeout(() => {
            nav("..");
        }, 1500);
    };

    return (
        <Center w="100vw" h="100vh" bg="rgba(0,0,0,0.75)" p="sm">
            <MantineThemeProvider>
                <Paper
                    ref={ref}
                    w="100%"
                    maw={600}
                    p="xl"
                    radius="md"
                    shadow="xl"
                >
                    <Stack gap="md">
                        <Group justify="center" mb="sm">
                            <Text size="xl" fw={700}>
                                Medical Form
                            </Text>
                        </Group>

                        {isSuccess && (
                            <Alert color="green" variant="light" title="Επιτυχία">
                                Το έντυπο υποβλήθηκε με επιτυχία! (Form successfully submitted!)
                            </Alert>
                        )}

                        <Checkbox.Group
                            label="Σε τι απο τα παρακάτω εχει αλλεργία ο ασθενής;"
                            value={allergies}
                            onChange={setAllergies}
                            withAsterisk
                            error={errors.allergies ? "Παρακαλώ επιλέξτε τουλάχιστον μία αλλεργία (Please select at least one allergy)" : null}
                        >
                            <Stack gap="xs" mt="sm">
                                {allergyOptions.map((option) => (
                                    <Checkbox 
                                        key={option.value} 
                                        value={option.value} 
                                        label={option.label} 
                                        color="blue"
                                    />
                                ))}
                            </Stack>
                        </Checkbox.Group>

                        <Select
                            label="Ενέργεια (Action taken)"
                            placeholder="Select an action"
                            data={actionOptions}
                            value={action}
                            onChange={setAction}
                            searchable
                            clearable
                            withAsterisk
                            error={errors.action ? "Παρακαλώ επιλέξτε ενέργεια (Please select an action)" : null}
                        />

                        <Textarea
                            label="Αιτιολογία (Reasoning)"
                            placeholder="Εισάγετε τον λόγο για την ενέργεια... (Enter reasoning here...)"
                            minRows={2}
                            autosize
                            value={reasoning}
                            onChange={(event) => setReasoning(event.currentTarget.value)}
                            withAsterisk
                            error={errors.reasoning ? "Παρακαλώ εισάγετε αιτιολογία (Please provide reasoning)" : null}
                        />

                        <Textarea
                            label="Σχόλια (Notes)"
                            placeholder="Πληκτρολογήστε παραπάνω πληροφορίες εδω.."
                            minRows={4}
                            autosize
                            maxRows={8}
                            value={notes}
                            onChange={(event) => setNotes(event.currentTarget.value)}
                        />

                        <Button 
                            fullWidth 
                            mt="xl" 
                            size="md" 
                            color="blue"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Paper>
            </MantineThemeProvider>
        </Center>
    );
}