import { useNavigate } from "react-router"
import { makeHotspot, OverlayImage } from "../common/overlayHotspot"
import eventBus from "../common/eventBus";
import { Actions } from "../engine/schemas/actionEnum";
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

const onlineHelp:PageHelp={
    pageTitle:"Scenario home",
    activeSections:[
        {
            title:"Vitals",
            steps:[
                {
                    stepContent:"In vitals you can find ..."
                }
            ]
        },
        {
            title:"Cabinet - Ντουλάπι Φαρμάκων",
            steps:[
                {
                    stepContent:"Στο ντουλάπι φαρμάκων θα βρείς όλα τα δίαφορα είδη χορηγήσεων. Συγκεκριμένα, θα βρείς αναλγυτικά, φάρμακα μεταβολής πίεσης και φάρμακα μεταβολής θερμοκρασίας."
                }
            ]
        },
        {
            title: "Ventilator",
            steps: [
                {
                    stepContent: "In ventilator you can find ..."
                }
            ]
        },
        {
            title: "Patient info",
            steps: [
                {
                    stepContent: "In patient info you can find ..."
                }
            ]
        }
    ]
}

