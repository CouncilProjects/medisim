export const vitalsSchema = {
    $id: "vitals",
    type: "object",
    required: ["hr", "spo2", "rr", "bp", "temp"],
  properties: {
    hr: {
      type: "object",
      required: ["value", "state"],
      properties: {
        value: { type: "number", minimum: 30, maximum: 220 },
        state: { type: "string", enum: ["stable", "rising", "falling"] }
      },
      additionalProperties: false
    },
    spo2: {
      type: "object",
      required: ["value", "state"],
      properties: {
        value: { type: "number", minimum: 85, maximum: 100 },
        state: { type: "string", enum: ["stable", "rising", "falling"] }
      },
      additionalProperties: false
    },
    rr: {
      type: "object",
      required: ["value", "state"],
      properties: {
        value: { type: "number"},
        state: { type: "string", enum: ["stable", "rising", "falling"] }
      },
      additionalProperties: false
    },
    bp: {
      type: "object",
      required: ["value", "state"],
      properties: {
        value: { type: "number", minimum: 40, maximum: 250 },
        state: { type: "string", enum: ["stable", "rising", "falling"] }
      },
      additionalProperties: false
    },
    temp: {
      type: "object",
      required: ["value", "state"],
      properties: {
        value: { type: "number"},
        state: { type: "string", enum: ["stable", "rising", "falling"] }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};
