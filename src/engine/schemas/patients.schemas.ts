export const patientSchema = {
    $id: "patient",
    type: "object",
    required: ["id", "name", "age"],
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        age: { type: "number", minimum: 0, maximum: 120 },
        gender: { type: "string", enum: ["male", "female", "other"] },
        sensitivities: {
            type: "array",
            items: { type: "string", enum: ["painkillers", "bloodpressure", "temp"] },
        }
    },
    additionalProperties: false
} as const;