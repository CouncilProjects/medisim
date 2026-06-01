import { type Scenario } from "../engine/types"

export const preLoadScenarios:Scenario[] = [
    {
        id: "scn_001",
        title: "Acute Chest Pain Case",
        current_node: 0,
        state: {
            score: 0,
            vitals: {
                hr: { value: 110, state: "rising" },
                spo2: { value: 94, state: "falling" },
                rr: { value: 22, state: "rising" },
                bp: { value: 150, state: "rising" },
                temp: { value: 37.2, state: "stable" }
            }
        },
        nodes: [
            {
                id: "node_0",
                text: "A 58-year-old male presents with chest pain and shortness of breath. What do you do first?",
                options: [
                    {
                        label: "Give oxygen",
                        action:"oxyPumpsUp",
                        effects: [
                            {
                                type: "update_state",
                                path: "vitals.spo2.value",
                                value: 98
                            },
                            {
                                type: "update_state",
                                path: "vitals.spo2.state",
                                value: "stable"
                            },
                            {
                                type: "score",
                                value: 10
                            },
                            {
                                type: "next_node",
                                node_id: "node_1"
                            }
                        ]
                    },
                    {
                        label: "Order ECG first",
                        action:'doTests',
                        effects: [
                            {
                                type: "score",
                                value: 5
                            },
                            {
                                type: "next_node",
                                node_id: "node_1"
                            }
                        ]
                    }
                ]
            },

            {
                id: "node_1",
                text: "ECG shows ST elevation. Patient is deteriorating.",
                options: [
                    {
                        label: "Activate cath lab",
                        action:'bloodPressureUp',
                        effects: [
                            {
                                type: "score",
                                value: 20
                            },
                            {
                                type: "update_state",
                                path: "vitals.hr.value",
                                value: 100
                            },
                            {
                                type: "next_node",
                                node_id: "node_2"
                            }
                        ]
                    },
                    {
                        label: "Give aspirin only",
                        action:'painkillers',
                        effects: [
                            {
                                type: "score",
                                value: -5
                            },
                            {
                                type: "update_state",
                                path: "vitals.bp.value",
                                value: 140
                            },
                            {
                                type: "next_node",
                                node_id: "node_2"
                            }
                        ]
                    }
                ]
            },

            {
                id: "node_2",
                text: "Patient stabilizes after intervention. Continue monitoring.",
                options: [
                    {
                        label: "Observe in ICU",
                        action:'wait',
                        effects: [
                            {
                                type: "score",
                                value: 10
                            }
                        ]
                    }
                ]
            }
        ],
        actionsTaken:[],
    }
]