export const scenarioSchema = {
    $id: "scenario",

    type: "object",

    required: ["id", "username", "title", "current_node", "state", "nodes"],

    properties: {
        id: {type: "string"},
        username: { type: "string"},
        title: { type: "string" },
        current_node: { type: "number"},

        state: { $ref: "state"},

        global_rules: {
            type: "array",

            items:{$ref: "rule"}
        },

        nodes: {
            type: "array",

            items: {$ref: "node"}
        }
    },

    additionalProperties: false
};