import { type FromSchema } from "json-schema-to-ts";

import { conditionSchema } from "./schemas/conditions.schemas";
import { effectSchema } from "./schemas/effect.schemas";
import { patientSchema } from "./schemas/patients.schemas";
import { vitalsSchema } from "./schemas/vitals.schemas";
import type { Action } from "./schemas/actionEnum";

// ==========================================
// 1. NO-DEPENDENCY AUTOMATED TYPES
// ==========================================
export type Condition = FromSchema<typeof conditionSchema>;
export type Effect = FromSchema<typeof effectSchema>;
export type Patient = FromSchema<typeof patientSchema>;
export type Vitals = FromSchema<typeof vitalsSchema>;


// FOR SOME F@CKING REASON STATE FAILS TO BE COMPILED I HAVE BEEN AT THIS FOR 1.5 HOURS ALREADY 
//  I GIVE UP, i will just manually make the type, AVJ was proven useless.... thks mike ..............................
export type State = {
    score: number;
    vitals: Vitals;
};

export type Option = {
    label: string;
    action:Action
    effects: Effect[];
};

export type Node = {
    id: string;
    text: string;
    options?: Option[];
};

export type Timeout = {
    time: number;
    effects: Effect[];
};

export type Scenario = {
    id: string;
    username?: string;
    title: string;
    current_node: number;
    state: State;
    nodes: Node[];
};