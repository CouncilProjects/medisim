export const patientSchema = {
    $id: "patient",
    type: "object",
    required: ["id", "name", "age"],
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        age: { type: "number", minimum: 0, maximum: 120 }
    },
    additionalProperties: false
} as const;