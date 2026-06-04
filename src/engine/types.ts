import { type FromSchema } from "json-schema-to-ts";

import { ScenarioSchema } from "./schemas/scenario.schemas";
import { stateSchema } from "./schemas/state.schemas";
import { nodeSchema } from "./schemas/nodes.schemas";
import { OptionsSchema } from "./schemas/options.schemas";
import { effectSchema } from "./schemas/effect.schemas";
import { vitalsSchema } from "./schemas/vitals.schemas";
import { patientSchema } from "./schemas/patients.schemas";
import { conditionSchema } from "./schemas/conditions.schemas";


const references = [
    conditionSchema,
    effectSchema,
    patientSchema,
    vitalsSchema,
    stateSchema,
    nodeSchema,
    OptionsSchema,
];



export type Condition = FromSchema<
    typeof conditionSchema,
    {references: typeof references }
>;

export type Effect = FromSchema<
    typeof effectSchema,
    {references: typeof references }
>;

export type Patient = FromSchema<
    typeof patientSchema,
    { references: typeof references }
>;

export type Vitals = FromSchema<
    typeof vitalsSchema,
    { references: typeof references }
>;

export type State = FromSchema<
    typeof stateSchema,
    { references: typeof references }
>;

export type Option = FromSchema<
    typeof OptionsSchema,
    { references: typeof references }
>;

export type Node = FromSchema<
    typeof nodeSchema,
    { references: typeof references }
>;

export type Scenario = FromSchema<
    typeof ScenarioSchema,
    { references: typeof references }
>;

