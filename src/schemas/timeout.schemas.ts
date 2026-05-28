export const timeoutSchema = {
    $id: "timeout",

    type: "object",

    required: ["time", "effects"],

    properties: {
        time: {type: "number", minimum: 0},

        effects:{
            type: "array",

            items:{$ref: "effect"}
        }
    },
    additionalProperties:false
};