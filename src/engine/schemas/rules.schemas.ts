export const RulesSchema = {
    $id: "rule",
    type: "object",

    required: ["rule_id", "condition", "text"],

    properties:{
        rule_id: {type: "number", minimum: 0},
        text: {type: "string"},

        condition: {
            type: "array",

            items: {$ref: "condition"}
            
        }

    }
} as const;