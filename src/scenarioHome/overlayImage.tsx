import { useNavigate, useParams } from "react-router"
import { makeHotspot, OverlayImage } from "../common/overlayHotspot"
import eventBus from "../common/eventBus";
import { Actions } from "../engine/schemas/actionEnum";
import { Box, Group, Kbd } from "@mantine/core";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";


export function OverlayImageMenu(){
    let params = useParams();
    let nav = useNavigate();

    return(
        <OverlayImage src='/workspace.png'
            hotspots={
                [
                    makeHotspot(0.25, 0.28, (() => { nav("vitals") }), "Vitals", 215, 175),
                    makeHotspot(0.22, 0.70, (() => { nav("info") }), "Patient info", 150, 190),
                    makeHotspot(0.76, 0.35, (() => { nav("ventilation") }), "Ventilation", 180, 180),
                    makeHotspot(0.90, 0.65, (() => { nav("cabinet") }), "Medicine cabinet", 240, 400),
                    makeHotspot(0.61, 0.31, (() => { eventBus.emit('buttonPressed', { action: Actions.callDoctor }) }), "Doctor call", 50, 70)
                ]
            }
        >
        </OverlayImage>
    )
}

