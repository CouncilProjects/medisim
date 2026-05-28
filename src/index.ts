import { validateVitals } from "./engine/validators";
import { validateConditions } from "./engine/validators";

const vital_data = {
  hr: { value: 60, state: "stable" },
  spo2: { value: 85, state: "falling" },
  rr: { value: 12, state: "stable" },
  bp: { value: 40, state: "stable" },
  temp: { value: 12, state: "stable" }
};

const condition_data = {
  hr: { gt: 50 },
  spo2: { lt: 90 },
  rr: { eq: 12 },
  bp: { lt: 120 },
  temp: { gt: 35 }
};



const vital_results = validateVitals(vital_data);
const condition_results = validateConditions(condition_data);

console.log("Vitals validation:", vital_results);
console.log("Conditions validation:", condition_results);