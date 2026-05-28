import Ajv from "ajv";
import { vitalsSchema } from "../schemas/vitals.schemas";
import { conditionSchema } from "../schemas/conditions.schemas";

const ajv = new Ajv({ allErrors: true });

const validateVitalsSchema = ajv.compile(vitalsSchema);
const validateConditionsSchema = ajv.compile(conditionSchema);

export function validateConditions(data: unknown) {
    const valid = validateConditionsSchema(data);

    if (!valid) {
        return {
            valid: false,
            errors: validateConditionsSchema.errors
        };
    }

    return { valid: true };
}

export function validateVitals(data: unknown) {
    const valid = validateVitalsSchema(data);

    if (!valid) {
        return {
            valid: false,
            errors: validateVitalsSchema.errors
        };
    }

    return { valid: true };
}