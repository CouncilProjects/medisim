import Ajv from "ajv";
import { assessmentSchema } from "../schemas/assessments.schemas";
import { conditionSchema } from "../schemas/conditions.schemas";
import { effectSchema } from "../schemas/effect.schemas";
import { nodeSchema } from "../schemas/nodes.schemas";
import { OptionsSchema } from "../schemas/options.schemas";
import { patientSchema } from "../schemas/patients.schemas";
import { ScenarioSchema } from "../schemas/scenario.schemas";
import { stateSchema } from "../schemas/state.schemas";
import { vitalsSchema } from "../schemas/vitals.schemas";

const ajv = new Ajv({ allErrors: true, strict: false });

ajv.addSchema([
    assessmentSchema,
    conditionSchema,
    ScenarioSchema,
    stateSchema,
    patientSchema,
    nodeSchema,
    OptionsSchema,
    effectSchema,
    vitalsSchema,
]);

const validateVitalsSchema = ajv.compile(vitalsSchema);
const validateConditionsSchema = ajv.compile(conditionSchema);
const validateScenarioSchema = ajv.compile(ScenarioSchema);

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

export function validateScenario(data: unknown) {
    const valid = validateScenarioSchema(data);

    if (!valid) {
        return {
            valid: false,
            errors: validateScenarioSchema.errors
        };
    }

    return { valid: true };
}