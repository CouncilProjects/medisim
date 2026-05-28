export const OptionsSchema ={

    $id: "option",

    type: "object",

    required: ["label","effects"],

    properties: {
        label: {type: "string"},

        effects: {
            type: "array",

            items: {$ref: "effect"}
        }
    },
    additionalProperties:false
};






