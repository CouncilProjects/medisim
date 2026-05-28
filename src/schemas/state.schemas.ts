export const stateSchema = {

    $id: "state",

    type: "object",

    required: ["score", "vitals"],


    properties: {
        score: {type: "number" },

        vitals:{$ref: "vitals"}
    },
    additionalProperties:false
};