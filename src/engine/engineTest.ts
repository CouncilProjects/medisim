import { Engine } from "./engine"
import { preLoadScenarios } from "../home/preloadedScenarios"
import { Actions } from "./schemas/actionEnum";
import eventBus from "../common/eventBus";
import { Logger } from "./logger";

new Logger("TestLogger");
const engine = new Engine();
engine.setScenario(preLoadScenarios[0]);

let end =false
let index=0
eventBus.on("buttonPressed",({action})=>{engine.actionHappend(action)});

eventBus.on('end',()=>{console.log("Scenario came to end"); end=true});
engine.testGetInfo();


//fake action sequence
const fakeActionSeq = [Actions.oxyPumpsUp,Actions.bloodPressureUp,Actions.oxyPumpsDown,Actions.wait]

while (!end) {
    eventBus.emit("buttonPressed",{action:fakeActionSeq[index]});
    engine.testGetInfo();
    index++;
}



