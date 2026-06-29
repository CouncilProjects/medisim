import { type Scenario } from "../engine/types"

export const preLoadScenarios:Scenario[] = [
    {
        id: "scn_001",
        UUID: "",
        title: "Acute Chest Pain Case",
        current_node: 0,
        actionsTaken: [],
        state: {
            score: 0,
            assessment: [],
            vitals: {
                hr: { value: 45, state: "falling" },
                spo2: { value: 94, state: "falling" },
                rr: { value: 22, state: "rising" },
                bp: { value: 150, state: "rising" },
                temp: { value: 37.2, state: "stable" }
            }
        },

        patient: {
            id: "patient_001",
            name: "John Doe",
            age: 58,
            gender : "male",
            sensitivities: ["bloodpressure"]
        },

        global_rules: [
            {
                rule_id: 1,
                text: "Heart rate is critically low.",
                condition: [
                    {
                        "vitals.hr.value": { lt: 50 }
                    }
                ]
            }
        ],

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
                    },
                    {
                        label:"A time out",
                        action:"timeout",
                        effects: [
                            {
                                type: "score",
                                value: -10
                            },
                            {
                                type: "next_node",
                                node_id: "node_1"
                            }
                        ]
                    }
                ],
                timeout: 12000,
        },

            {
                id: "node_1",
                text: "ECG shows ST elevation. Patient is deteriorating.",
                options: [
                    {
                        label: "Activate cath lab",
                        action:"oxyPumpsUp",
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
            },
        ],
    },
    {
        id:"Unknown_homeless",
        UUID:"",
        title:"The homeless man",
        state: {
            score: 0,
            assessment:[],
            vitals: {
                hr: { value: 150, state: "rising" },
                spo2: { value: 94, state: "stable" },
                rr: { value: 22, state: "rising" },
                bp: { value: 150, state: "rising" },
                temp: { value: 45.2, state: "rising" }
            }
        },
        patient: {
            id: "patient_002",
            name: "Unknown Homeless Patient",
            age: 47,
            gender: "other",
            sensitivities: ["temp"]
        },
        current_node:0,
        actionsTaken:[],
        nodes:[
            {
                id:"entry",
                text:"A homeless man entered the hospital, he seems disioriented",
                options:[
                    {
                        label:"Do a blood test",
                        action:'bloodTest',
                        effects:[
                            {
                                type:'score',
                                value:5
                            },
                            {
                                type:'next_node',
                                node_id:'blood_test_results'
                            }
                        ]
                    },
                    {
                        label: "Give anti temprature drugs",
                        action: 'tempDown',
                        effects: [
                            {
                                type: 'score',
                                value: 10
                            },
                            {
                                type: 'next_node',
                                node_id: 'unknown_condition'
                            },
                            {
                                type:'update_state',
                                path:'vitals.temp.value',
                                value:38
                            },
                            {
                                type: 'update_state',
                                path: 'vitals.temp.state',
                                value: 'stable'
                            }
                        ]
                    }
                ]
            },
            {
                id: "blood_test_results",
                text: "The blood test results indicate the patient is suffering from an illness affecting his blood pressure. He requires medication to stabilize it.",
                options: [
                    {
                        label: "Administer blood pressure drugs",
                        action: "bloodPressureDown",
                        effects: [
                            {
                                type: "score",
                                value: 10
                            },
                            {
                                type:'update_state',
                                path:'vitals.hr.value',
                                value:120
                            },
                            {
                                type: 'update_state',
                                path: 'vitals.bp.value',
                                value: 90
                            },
                            {
                                type: 'update_state',
                                path: 'vitals.hr.state',
                                value: 'stable'
                            },
                            {
                                type: 'update_state',
                                path: 'vitals.hr.state',
                                value: 'stable'
                            },
                            {
                                type: "next_node",
                                node_id: "fever_discovered"
                            }
                        ]
                    }
                ]
            },
            {
                id: "fever_discovered",
                text: "The patient's blood pressure is improving, but he is still running a fever, he is weak from the drug dosage",
                options: [
                    {
                        label: "Give light anti-temperature medication",
                        action: "tempDownLight",
                        effects: [
                            {
                                type: "score",
                                value: 15
                            },
                            {
                                type: "next_node",
                                node_id: "patient_stabilized"
                            }
                        ]
                    }
                ]
            },
            {
                id: "patient_stabilized",
                text: "The patient's condition has stabilized. His fever is under control and his blood pressure is within acceptable limits. All you have to do is wait",
                options: [
                    {
                        action:'wait',
                        effects:[],
                        label:'end-1'
                    }
                ]
            },

            // Existing anti-temperature route leads here
            {
                id: "unknown_condition",
                text: "The patient's temperature has decreased, but something is still clearly wrong. An underlying illness may be present.",
                options: [
                    {
                        label: "Perform blood test",
                        action: "bloodTest",
                        effects: [
                            {
                                type: "score",
                                value: 5
                            },
                            {
                                type: "next_node",
                                node_id: "late_diagnosis"
                            }
                        ]
                    }
                ]
            },
            {
                id: "late_diagnosis",
                text: "The blood test reveals the illness has progressed while untreated. The patient's blood pressure is dropping rapidly and his condition is worsening.",
                options: [
                    {
                        label: "Administer blood pressure drugs",
                        action: "bloodPressureDown",
                        effects: [
                            {
                                type: "score",
                                value: 5
                            },
                            {
                                type: "next_node",
                                node_id: "late_diagnosis_stage_2"
                            }
                        ]
                    }
                ]
            },
            {
                id: "late_diagnosis_stage_2",
                text: "The patient responds slightly, but his condition remains critical. Additional blood pressure support is required.",
                options: [
                    {
                        label: "Administer blood pressure drugs",
                        action: "bloodPressureDown",
                        effects: [
                            {
                                type: "score",
                                value: 5
                            },
                            {
                                type: "next_node",
                                node_id: "late_diagnosis_stage_3"
                            }
                        ]
                    }
                ]
            },
            {
                id: "late_diagnosis_stage_3",
                text: "The patient is still weak and unstable. One final dose of blood pressure medication is needed.",
                options: [
                    {
                        label: "Administer blood pressure drugs",
                        action: "bloodPressureDown",
                        effects: [
                            {
                                type: "score",
                                value: 5
                            },
                            {
                                type: "next_node",
                                node_id: "recovered_after_delay"
                            }
                        ]
                    }
                ]
            },
            {
                id: "recovered_after_delay",
                text: "After extensive treatment, the patient's blood pressure has stabilized. He is expected to recover, though the delayed diagnosis significantly complicated treatment. Now just wait",
                options: [
                    
                ]
            }
        ]
        
    }
]