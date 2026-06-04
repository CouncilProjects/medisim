import { Actions } from "./actionEnum";
import {type ActionKey} from "./actionEnum";

export const ScenarioSchema = {
    $id: "scenario",

    type: "object",

    required: ["id", "UUID", "title", "current_node", "actionsTaken", "state", "nodes"],

    properties: {
        id: {type: "string"},
        UUID: {type: "string"},
        username: { type: "string"},
        uuid: {type:"string"},
        title: { type: "string" },
        current_node: { type: "number"},
        actionsTaken: {
            type: "array",
            items: {type: "string",enum: Object.keys(Actions) as unknown as ActionKey[]}
        },

        state: { $ref: "state"},

        nodes: {
            type: "array",

            items: {$ref: "node"}
        }
    },

    additionalProperties: false
} as const;


/*

        global_rules: {
            type: "array",

            items:{$ref: "rule"}
        },
*/