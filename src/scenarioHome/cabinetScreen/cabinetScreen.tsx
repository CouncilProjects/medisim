//npm install @tabler/icons-react

import { useNavigate } from "react-router";
import {
    Stack,
    Text,
    Divider,
    Center,
    SimpleGrid,
    Modal,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
// import { useNavigate } from 'react-router';
import eventBus from '../../common/eventBus';

import {
    IconClock,
    IconFlask,
    IconHeartRateMonitor
} from '@tabler/icons-react';

import painkillersImg from '../../assets/painkillers.jpg';
import painkillersLightImg from '../../assets/painkillers-light.jpg';
import ibuprofenImg from '../../assets/ibuprofen.jpg';
import pseudoephedrineImg from '../../assets/pseudoephedrine.jpg';
import betaBlockersImg from '../../assets/beta-blockers.jpg';
import lisinoprilImg from '../../assets/lisinopril.jpg';
import amphotericinImg from '../../assets/amphotericin.jpg';
import vaccinesImg from '../../assets/vaccines.jpg';
import naproxenImg from '../../assets/naproxen.jpg';
import acetaminophenImg from '../../assets/acetaminophen.jpg';
import { OnLineHelp, type PageHelp } from "../../common/onlineHelp";
import { useScenarioContext } from "../scenarioHome";
import { Section } from "./Section";
import { VialButton } from "./VialButton";
import { ActionCard } from "./ActionCard";



export default function CabinetScreen() {
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
        <Center w="100vw" h="100vh" bg="rgba(0,0,0,0.75)" p="sm">
            <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="Cabinet Screen">
                    <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
            </Modal>

            <Stack
                ref={ref}
                p="md"
                maw={750} 
                w="100%"
                gap={12}
                style={{
                    background: '#0e0e0e',
                    borderRadius: 12,
                    border: '1px solid #222',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.85)',
                }}
            >
                <Text fw={700} size="lg" c="gray.2">
                    Medical Cabinet & Procedures
                </Text>

                <Section title="Painkillers Shelf" color="green.5">
                    <SimpleGrid cols={4} spacing={10}>
                        <VialButton
                            label="Painkillers"
                            subtitle="Standard Dose"
                            imageSrc={painkillersImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'painkillers' })}
                        />
                        <VialButton
                            label="Painkillers Light"
                            subtitle="Reduced Dose"
                            imageSrc={painkillersLightImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'painkillersLight' })}
                        />
                    </SimpleGrid>
                </Section>

                <Section title="Blood Pressure Medicine Shelf" color="violet.4">
                    <SimpleGrid cols={4} spacing={10}>
                        <VialButton label="Ibuprofen" subtitle="Increase Blood Pressure" imageSrc={ibuprofenImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'bloodPressureUp' })} />
                        <VialButton label="Pseudoephedrine" subtitle="Increase Blood Pressure Light" imageSrc={pseudoephedrineImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'bloodPressureUpLight' })} />
                        <VialButton label="Beta-Blockers" subtitle="Decrease Blood Pressure" imageSrc={betaBlockersImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'bloodPressureDown' })} />
                        <VialButton label="Lisinopril" subtitle="Decrease Blood Pressure Light" imageSrc={lisinoprilImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'bloodPressureDownLight' })} />
                    </SimpleGrid>
                </Section>

                <Section title="Temperature Medicine Shelf" color="red.5">
                    <SimpleGrid cols={4} spacing={10}>
                        <VialButton label="Amphotericin B" subtitle="Increase Temperature" imageSrc={amphotericinImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'tempUp' })} />
                        <VialButton label="Routine Vaccines" subtitle="Increase Temperature Light" imageSrc={vaccinesImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'tempUpLight' })} />
                        <VialButton label="Naproxen" subtitle="Decrease Temperature" imageSrc={naproxenImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'tempDown' })} />
                        <VialButton label="Acetaminophen" subtitle="Decrease Temperature Light" imageSrc={acetaminophenImg}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'tempDownLight' })} />
                    </SimpleGrid>
                </Section>

                <Divider color="#1e1e1e" my={2} />

                <Section title="Procedures & Tests" color="blue.4">
                    <SimpleGrid cols={4} spacing={10}>
                        <ActionCard label="Wait" color="#868e96" icon={<IconClock size={20} />}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'wait' })} />
                        <ActionCard label="Do Tests" color="#4dabf7" icon={<IconFlask size={20} />}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'doTests' })} />
                        <ActionCard label="Blood Test" color="#fa5252" icon={<IconFlask size={20} />}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'bloodTest' })} />
                        <ActionCard label="Cholesterol" color="#fab005" icon={<IconHeartRateMonitor size={20} />}
                            onClick={() => eventBus.emit('buttonPressed', { action: 'cholesterolTest' })} />
                    </SimpleGrid>
                </Section>
            </Stack>
        </Center>
    );
}

const onlineHelp: PageHelp = {
    pageTitle: "Ντουλάπι Φαρμάκων",
    activeSections: [
        {
            title: "Παυσίπονα",
            steps: [
                {
                    stepContent: "Τα παυσίπονα χρησιμοποιούνται όταν ο ασθενής πονάει. Η ελαφριά έκδοση χρησιμοποιείται για ήπιο πόνο ή όταν ο ασθενής αισθάνεται ζάλη."
                }
            ]
        },
        {
            title: "Φάρμακα Πίεσης Αίματος",
            steps: [
                {
                    stepContent: "Αυτό το ράφι περιέχει δύο κατηγορίες φαρμάκων: φάρμακα που αυξάνουν την αρτηριακή πίεση και φάρμακα που τη μειώνουν. Οι κανονικές εκδόσεις χρησιμοποιούνται σε πιο σοβαρές περιπτώσεις, ενώ οι ελαφριές εκδόσεις σε λιγότερο σοβαρές καταστάσεις."
                }
            ]
        },
        {
            title:"Φάρμακα Μεταβολής Θερμοκρασίας",
            steps:[
                {
                    stepContent:"Αυτό το ράφι περιέχει φάρμακα που αυξάνουν ή μειώνουν τη θερμοκρασία του σώματος. Χρησιμοποιούνται όταν η θερμοκρασία του ασθενούς βρίσκεται εκτός των φυσιολογικών ορίων. Οι κανονικές εκδόσεις προορίζονται για πιο σοβαρές καταστάσεις, ενώ οι ελαφριές εκδόσεις για ηπιότερες αποκλίσεις."
                }
            ]
        },
        {
            title:"Ελαφριές δόσεις",
            steps:[
                {
                    stepContent:"Οι ελαφριές δόσεις και η επιλογή χρήσης τους πρέπει να χορηγούνται με προσοχή.",
                    important : true
                }
            ]
        }
    ]
};