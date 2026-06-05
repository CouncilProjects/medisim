export const nodeSchema = {
    $id: "node",

    type: "object",

    required: ["id", "text","options"],

    properties: {
        id: {type: "string"},
        text: {type: "string"},
        options: {
            type: "array",
            
            items: {$ref: "option"}
        },

        timeout: {type: "number"},
    },
    additionalProperties:false
} as const;
