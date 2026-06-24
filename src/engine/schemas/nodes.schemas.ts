export const nodeSchema = {
    $id: "node",

    type: "object",

    required: ["id", "text","options"],

    properties: {
        id: {type: "string"},
        text: {type: "string"},
        form: {type: "string"},
        timeout: {type: "number"},
        
        options: {
            type: "array",
            
            items: {$ref: "option"}
        },


    },
    additionalProperties:false
} as const;