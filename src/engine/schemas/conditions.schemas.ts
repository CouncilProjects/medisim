export const conditionSchema = {
    type: "object",
    additionalProperties: {
        type:"object",
        properties: {
            gt: {type: "number"},
            lt: {type: "number"},
            eq: {type: "number"}
        },
        additionalProperties: false,
        minProperties: 1
    }
} as const;