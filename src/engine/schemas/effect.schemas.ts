 export const effectSchema = {
    $id: "effect",
    oneOf: [
        {
            type: "object",
            required: ["type", "path", "value"],
            properties: {
                type: { const: "update_state" },
                path: { type: "string" },
                value: {}
            },
            additionalProperties: false
        },
        {
            type: "object",
            required: ["type", "value"],
            properties: {
                type: { const: "score" },
                value: { type: "number" }
            },
            additionalProperties: false
        },
        {
            type: "object",
            required: ["type", "node_id"],
            properties: {
                type: { const: "next_node" },
                node_id: { type: "string" }
            },
            additionalProperties: false
        }
    ]
} as const
