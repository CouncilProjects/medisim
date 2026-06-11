import { useNavigate } from "react-router"
import { makeHotspot, OverlayImage } from "../common/overlayHotspot"
import eventBus from "../common/eventBus";
import { Modal } from "@mantine/core";
import { OnLineHelp, type PageHelp } from "../common/onlineHelp";
import { useScenarioContext } from "./scenarioHome";


export function OverlayImageMenu(){
    const nav = useNavigate();
    const { helpNeeded } = useScenarioContext();
    return(
        <>
        <OverlayImage src='/workspace.png'
            hotspots={
                [
                    makeHotspot(0.25, 0.28, (() => { nav("vitals")}), "Vitals", 215, 175),
                    makeHotspot(0.22, 0.70, (() => { nav("info") }), "Patient info", 150, 190),
                    makeHotspot(0.76, 0.35, (() => { nav("ventilation") }), "Ventilation", 180, 180),
                    makeHotspot(0.90, 0.65, (() => { nav("cabinet") }), "Medicine cabinet", 240, 400),
                    makeHotspot(0.61, 0.31, (() => { eventBus.emit('buttonPressed', { action: "callDoctor"}) }), "Doctor call", 50, 70)
                ]
            }
        >
            
        </OverlayImage>
            <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="On-line help">
                            <OnLineHelp pageHelp={onlineHelp}></OnLineHelp>
            </Modal> 
        </>
    )
}

const onlineHelp: PageHelp = {
    pageTitle: "Κεντρική Οθόνη Χώρου Προσομοίωσης",
    activeSections: [
        {
            title: "Vitals - Ζωτικά Σημεία (Monitor)",
            steps: [
                {
                    stepContent: "Στο Monitor ζωτικών σημείων μπορείτε να παρακολουθήσετε σε πραγματικό χρόνο τη φυσιολογική κατάσταση του ασθενούς. Περιλαμβάνει κρίσιμες ενδείξεις όπως ο καρδιακός ρυθμός, η αρτηριακή πίεση και άλλα βασικά αιμοδυναμικά δεδομένα."
                }
            ]
        },
        {
            title: "Patient Info - Πληροφορίες Ασθενούς",
            steps: [
                {
                    stepContent: "Εδώ μπορείτε να συμβουλευτείτε τον ιατρικό φάκελο του ασθενούς. Περιέχει το δημογραφικό και ιατρικό του προφίλ, καθώς και τη λίστα ευαισθησιών/δυσανεξιών (Sensitivities Checklist) που πρέπει πάντα να ελέγχετε πριν από οποιαδήποτε χορήγηση φαρμάκου."
                }
            ]
        },
        {
            title: "Ventilator - Αναπνευστήρας",
            steps: [
                {
                    stepContent: "Μέσω του αναπνευστήρα μπορείτε να ελέγξετε και να ρυθμίσετε την αναπνευστική υποστήριξη του ασθενούς. Παρέχει ενδείξεις για τον αναπνευστικό ρυθμό και το SpO2, καθώς και χειριστήρια για την προσαρμογή της πυκνότητας οξυγόνου (FiO2) και της ροής (Oxygen Pumps)."
                }
            ]
        },
        {
            title: "Medicine Cabinet - Ντουλάπι Φαρμάκων",
            steps: [
                {
                    stepContent: "Στο ντουλάπι φαρμάκων έχετε πρόσβαση σε όλα τα διαθέσιμα σκευάσματα για χορήγηση. Συγκεκριμένα, θα βρείτε αναλγητικά, αντιυπερτασικά/αγγειοδραστικά (φάρμακα μεταβολής πίεσης) και αντιπυρετικά (φάρμακα μεταβολής θερμοκρασίας)."
                }
            ]
        },
        {
            title: "Doctor Call - Κλήση Ιατρού",
            steps: [
                {
                    stepContent: "Το πλήκτρο κλήσης ιατρού χρησιμοποιείται σε περιπτώσεις έκτακτης ανάγκης. Ενεργοποιήστε το εάν η κατάσταση του ασθενούς επιδεινωθεί ραγδαία, οι ενδείξεις είναι εκτός ελέγχου και απαιτείται άμεση ιατρική παρέμβαση ή καθοδήγηση."
                }
            ]
        }
    ]
}