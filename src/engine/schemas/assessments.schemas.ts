export const assessmentSchema = {
    $id: "assessment",

    type: "object",

    required: ["nodeID","formID","value"],

    properties: {
        nodeID: {type: "string"},
        formID: {type: "string"},

        value: {
            type: "object",

            required: [
                "sensitivities",
                "last_action",
                "reason",
                "notes"
            ],
            properties: {
                sensitivities: {
                    type: "array",

                    items: {type: "string"}
                },

                last_action: {
                    type: "string"
                },

                reason: {
                    type: "string"
                },

                notes: {
                    type: "string"
                }
            },

            additionalProperties: false

        }
    },
    additionalProperties: false
} as const;