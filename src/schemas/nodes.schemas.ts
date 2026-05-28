export const nodeSchema = {
    $id: "node",

    type: "object",

    required: ["id", "text"],

    properties: {
        id: {type: "string"},
        text: {type: "string"},
        options: {
            type: "array",
            
            items: {$ref: "option"}
        }
    },
    additionalProperties:false
};
