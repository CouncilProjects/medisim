import { type Scenario } from "../engine/types"

export const preLoadScenarios: Scenario[] = [
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
      gender: "male",
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
            action: "oxyPumpsUp",
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
            action: 'doTests',
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
            label: "A time out",
            action: "timeout",
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
            action: "oxyPumpsUp",
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
            action: 'painkillers',
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
            action: 'wait',
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
    id: "Unknown_homeless",
    UUID: "",
    title: "The homeless man",
    state: {
      score: 0,
      assessment: [],
      vitals: {
        hr: { value: 150, state: "rising" },
        spo2: { value: 94, state: "stable" },
        rr: { value: 22, state: "stable" },
        bp: { value: 150, state: "stable" },
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
    current_node: 0,
    actionsTaken: [],
    nodes: [
      {
        id: "entry",
        text: "A homeless man entered the hospital, he seems disioriented",
        options: [
          {
            label: "Do a blood test",
            action: 'bloodTest',
            effects: [
              {
                type: 'score',
                value: 5
              },
              {
                type: 'next_node',
                node_id: 'blood_test_results'
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
                type: 'update_state',
                path: 'vitals.temp.value',
                value: 38
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
                type: 'update_state',
                path: 'vitals.hr.value',
                value: 120
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
            action: 'wait',
            effects: [],
            label: 'end-1'
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

  },
  {
    id: "scn_003",
    UUID: "",
    title: "Septic Shock",
    current_node: 0,
    actionsTaken: [],
    state: {
      score: 0,
      assessment: [],
      vitals: {
        hr: { value: 132, state: "rising" },
        spo2: { value: 91, state: "falling" },
        rr: { value: 30, state: "rising" },
        bp: { value: 86, state: "falling" },
        temp: { value: 40.2, state: "rising" }
      }
    },

    patient: {
      id: "patient_003",
      name: "Emily Carter",
      age: 41,
      gender: "female",
      sensitivities: ["bloodpressure"]
    },

    global_rules: [
      {
        rule_id: 1,
        text: "Patient is in septic shock.",
        condition: [
          {
            "vitals.bp.value": { lt: 90 }
          },
          {
            "vitals.temp.value": { gt: 39 }
          }
        ]
      }
    ],

    nodes: [

      {
        id: "node_0",
        text: "A 41-year-old woman arrives confused, feverish and hypotensive. What is your first action?",
        options: [
          {
            label: "Perform blood test",
            action: "bloodTest",
            effects: [
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
            label: "Give painkillers",
            action: "painkillers",
            effects: [
              {
                type: "score",
                value: -5
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
        id: "node_1",
        text: "Blood tests suggest a severe bacterial infection. Oxygen saturation continues to fall.",
        options: [
          {
            label: "Increase oxygen pump rate",
            action: "oxyPumpsUp",
            effects: [
              {
                type: "score",
                value: 10
              },
              {
                type: "update_state",
                path: "vitals.spo2.value",
                value: 97
              },
              {
                type: "update_state",
                path: "vitals.spo2.state",
                value: "stable"
              },
              {
                type: "next_node",
                node_id: "node_3"
              }
            ]
          },
          {
            label: "Wait",
            action: "wait",
            effects: [
              {
                type: "score",
                value: -10
              },
              {
                type: "next_node",
                node_id: "node_4"
              }
            ]
          }
        ]
      },

      {
        id: "node_2",
        text: "Painkillers reduce discomfort but the patient's condition worsens.",
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
                node_id: "node_1"
              }
            ]
          }
        ]
      },

      {
        id: "node_3",
        text: "Oxygenation improves, but blood pressure remains critically low.",
        options: [
          {
            label: "Increase blood pressure",
            action: "bloodPressureUp",
            effects: [
              {
                type: "score",
                value: 15
              },
              {
                type: "update_state",
                path: "vitals.bp.value",
                value: 108
              },
              {
                type: "update_state",
                path: "vitals.bp.state",
                value: "stable"
              },
              {
                type: "next_node",
                node_id: "node_5"
              }
            ]
          }
        ]
      },

      {
        id: "node_4",
        text: "The delay causes circulatory collapse. Emergency intervention is now required.",
        timeout: 15000,
        options: [
          {
            label: "Call doctor",
            action: "callDoctor",
            effects: [
              {
                type: "score",
                value: 5
              },
              {
                type: "next_node",
                node_id: "node_6"
              }
            ]
          },
          {
            action: "timeout",
            label: "Act quick",
            effects: [
              { type: 'score', value: -50 }, { type: 'next_node', node_id: "death" }
            ]
          }
        ]
      },

      {
        id: "node_5",
        text: "Blood pressure is stabilizing, but the fever remains dangerously high.",
        options: [
          {
            label: "Decrease body temperature",
            action: "tempDown",
            effects: [
              {
                type: "score",
                value: 15
              },
              {
                type: "update_state",
                path: "vitals.temp.value",
                value: 37.5
              },
              {
                type: "update_state",
                path: "vitals.temp.state",
                value: "stable"
              },
              {
                type: "next_node",
                node_id: "assessment_1"
              }
            ]
          }
        ]
      },
      {
        "id": "assessment_1",
        "text": "Complete clinical documentation for your first intervention.",
        "form": "ehr_documentantion",
        "options": [
          {
            "label": "Submit Documentation",
            "action": "submitAssessment",
            "effects": [
              { "type": "next_node", "node_id": "node_7" }
            ]
          }
        ]
      },

      {
        id: "node_6",
        text: "After emergency treatment the patient's blood pressure improves slightly, but she remains unstable.",
        options: [
          {
            label: "Increase blood pressure",
            action: "bloodPressureUp",
            effects: [
              {
                type: "score",
                value: 5
              },
              {
                type: "next_node",
                node_id: "node_8"
              }
            ]
          }
        ]
      },

      {
        id: "node_7",
        text: "The infection is under control. Continue monitoring until the patient fully stabilizes.",
        options: [
          {
            label: "Wait",
            action: "wait",
            effects: [
              {
                type: "score",
                value: 10
              },
              {
                type: "update_state",
                path: "vitals.hr.value",
                value: 88
              },
              {
                type: "update_state",
                path: "vitals.hr.state",
                value: "stable"
              },
              {
                type: "next_node",
                node_id: "node_9"
              }
            ]
          }
        ]
      },

      {
        id: "node_8",
        text: "The patient's condition slowly improves after delayed treatment.",
        options: [
          {
            label: "Decrease body temperature",
            action: "tempDown",
            effects: [
              {
                type: "score",
                value: 5
              },
              {
                type: "next_node",
                node_id: "node_9"
              }
            ]
          }
        ]
      },

      {
        id: "node_9",
        text: "The patient has recovered from septic shock and is transferred to the intensive care unit for observation.",
        options: [
          {
            label: "End Scenario",
            action: "wait",
            effects: []
          }
        ]
      },

      {
        id: "death",
        text: "You didnt call the doctor fast enough, the patient passed away",
        options: []
      }

    ]
  }
]
