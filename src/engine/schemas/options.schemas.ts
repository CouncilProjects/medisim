import { Actions } from "./actionEnum";

export const OptionsSchema ={

    $id: "option",

    type: "object",

    required: ["label","effects","action"],

    properties: {
        label: {type: "string"},
        action: {
            type: "string",
            enum: Object.values(Actions)
        },

        effects: {
            type: "array",

            items: {$ref: "effect"}
        }
    },
    additionalProperties:false
} as const;






