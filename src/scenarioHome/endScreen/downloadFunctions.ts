


// Source - https://stackoverflow.com/a/49917066
// Posted by Stefanos Chrs, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-01, License - CC BY-SA 4.0

import jsPDF from "jspdf";
import type { Debrief } from "./EndScreen";

export function downloadJSON(debrif:Debrief) {
    const data = new Blob([JSON.stringify(debrif)], { type: 'application/json' });
    const date = new Date().toJSON();
    const name = "medisim-Report-" + date + ".json"

    const url = URL.createObjectURL(data);

    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

export function downloadPDF(debrif: Debrief,dateTOprint:string) {
        const doc = new jsPDF();
        const date = new Date().toJSON();

        

        const name = "medisim-Report-" + date + ".pdf"
        let atHeight = 10;
        const pageHeight = doc.internal.pageSize.height;

        type defOptions = {
            fontSize?:number,
            color?:[number,number,number],
            lineHeightTimes?:number,
            forcePushDown?: number | null,
            align?: "left" | "center" | "right" | "justify" | null
        }

    function addWrapped(text: string, lineIndentation: number, options?: defOptions): number {
        const {
            fontSize = 10,
            color = [0, 0, 0] as [number, number, number],
            lineHeightTimes = 0.5,
            forcePushDown = 0.0,
            align = null
        } = options ?? {};

        doc.setFontSize(fontSize);
        doc.setTextColor(...color);

        const lineHeight = fontSize * lineHeightTimes;
        const lines = doc.splitTextToSize(text, 170);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isLastLine = i === lines.length - 1;

            if (atHeight > pageHeight - 20) {
                doc.addPage();
                atHeight = 20;
            }

            // Draw the text line
            doc.text(line, lineIndentation, atHeight, align != null ? { align: align } : undefined);

            // Apply spacing
            if (isLastLine) {
                if(forcePushDown==null){
                    break;
                } else if (forcePushDown !== 0.0) {
                    atHeight += forcePushDown;
                } else {
                    atHeight += lineHeight;
                }
            } else {
                atHeight += lineHeight;
            }
        }

        // Calculate where the last line structurally ends on the X-axis
        const lastLine = lines[lines.length - 1] || "";
        const lastLineWidth = doc.getTextWidth(lastLine);
        let endingX = lineIndentation;

        if (align === "right") {
            endingX = lineIndentation; // For right-align, lineIndentation acts as the right edge
        } else if (align === "center") {
            endingX = lineIndentation + (lastLineWidth / 2);
        } else {
            // Left aligned (default)
            endingX = lineIndentation + lastLineWidth;
        }

        // reset (revert color)
        doc.setTextColor(0, 0, 0);

        return endingX;
    }

        let img = new Image()
        img.src = '/favicon.png'
        doc.addImage(img, 'png', 4, 4, 24, 24);

        const prev = addWrapped("Medisim", doc.internal.pageSize.width / 2, { forcePushDown:null,fontSize: 15, color: [44, 134, 235], lineHeightTimes: 1, align:'center' });
        addWrapped("gr", prev + 1, { fontSize: 10, color: [44, 134, 235],lineHeightTimes:1.5});
        addWrapped("Scenario : "+debrif.scenarioName,30,{fontSize:15,lineHeightTimes:1, forcePushDown:20});
        
        
        addWrapped(`Taken by: ${debrif.taker} Score: ${debrif.score}`, 15);
        addWrapped(`Accuracy: ${debrif.goodPercent}%`, 15);
        addWrapped(`Finished at : `+dateTOprint,15,{color:[130,100,200]})
        for (const nodeLine of debrif.timeline) {
            addWrapped(nodeLine.duringNode+":\" " + nodeLine.nodeText+"\"" , 20);
            
            for (const act of nodeLine.nodeTimeline) {
                if(act.valid){
                    doc.setTextColor(0, 255, 0);
                } else {
                    doc.setTextColor(255, 0, 0);
                }
                addWrapped(
                    `• [${act.action}] Affected score by: ${act.scoreDelta}`,
                    25,
                    {color:act.valid?[20,200,30]:[200,30,20]}
                );
                doc.setTextColor(0, 0, 0);
            }
        }
        

        
        doc.save(name);
}