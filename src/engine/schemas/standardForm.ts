import { Actions } from "./actionEnum";
import type { Form } from  "./formTypes";

export const StandardForms: Form[] = [
    {
        id: "ehr_documentantion",
        title: "Clinical Documentantion",
        required: true,
        fields: [
            {
                id: "sensitivities",
                type: "checkboxGroup",
                label: "Check if the patient has any sensitivities",
                options: [
                    "bloodpressure",
                    "painkillers",
                    "oxygen",
                    "temperature"
                ],
                required: true
            },
            {
                id: "last_action",
                type: "select",
                label: "What action did you last take?",
                options: Object.keys(Actions),
                required: true
            },
            {
                id:"reason",
                type: "textarea",
                label: "Why did you take that action?",
                required: true
            },
            {
                id: "notes",
                type: "textarea",
                label: "Any notes?"
            }
        ]
    }
];