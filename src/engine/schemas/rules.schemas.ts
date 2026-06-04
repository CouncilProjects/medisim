export const RulesSchema = {
    $id: "rules",
    type: "object",

    required: ["rule_id", "condition", "text"],

    properties:{
        rule_id: {type: "string"},
        text: {type: "string"},

        condition: {
            type: "array",

            items: {$ref: "condition"}
            
        }

    }
}