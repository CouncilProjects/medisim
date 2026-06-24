export const stateSchema = {

    $id: "state",

    type: "object",

    required: ["score", "vitals","assessment"],


    properties: {
        score: {type: "number" },

        assessment: {
            type: "array",

            items: {$ref: "assessment"}
        },

        vitals:{$ref: "vitals"}
    },
    additionalProperties:false
} as const;