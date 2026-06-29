import eventBus from "../common/eventBus";
import type { Debrief, NodeTimelineSnapshot } from "../scenarioHome/endScreen/EndScreen";
import { Actions, type ActionKey } from "./schemas/actionEnum";
import { type Scenario,type Node, type Effect, type Rule } from "./types";

export class Engine{
    scenario!:Scenario
    private triggeredGlobalRules = new Set<number>();

    constructor(){
        console.log("Engine made");
    }

    setScenario(scen:Scenario){
        this.scenario=scen;
        this.triggeredGlobalRules.clear();

        eventBus.emit("movedToNewNode", { nodeTitle: this.scenario.nodes[this.scenario.current_node].text });
        this.evaluateGlobalRules();

        this.clearTimeoutHandle();
        this.startCurrentNodeTimeout();
    }

    // Source - https://stackoverflow.com/q/39060905
// Posted by Ankur Marwaha, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-28, License - CC BY-SA 3.0
    // https://stackoverflow.com/questions/13719593/how-to-set-object-property-of-object-property-of-given-its-string-name-in-ja
    //https://stackoverflow.com/questions/6842795/dynamic-deep-setting-for-a-javascript-object
    //https://stackoverflow.com/questions/39060905/how-recursion-takes-place-in-this-code-snippet
    
    
    private assign(obj:Record<string,any>, prop:string|string[], value:any) {
        if (typeof prop === "string")
            prop = prop.split(".");

        if (prop.length > 1) {
            const e = prop.shift();
            if (e === undefined) return;
            this.assign(obj[e] =
                Object.prototype.toString.call(obj[e]) === "[object Object]"
                    ? obj[e]
                    : {},
                prop,
                value);
        } else
            obj[prop[0]] = value;
    }


    private getCurrentNode():Node{
        return this.scenario.nodes[this.scenario.current_node]
    }

    private timeoutHandle:any = null;
    private timeoutToken = 0;

    private clearTimeoutHandle(){
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = null;
        }
        this.timeoutToken += 1;
    }

    private startCurrentNodeTimeout(){
        const timeout = this.scenario.nodes[this.scenario.current_node].timeout;

        if (timeout === undefined) {
            return;
        }

        eventBus.emit("nodeEntered", { timeout });

        const token = ++this.timeoutToken;
        this.timeoutHandle = setTimeout(() => {
            if (token !== this.timeoutToken) {
                return;
            }

            eventBus.emit("triggerTimeout", null);
        }, timeout);
    }

    private getValueAtPath(root: unknown, path: string): unknown {
        return path.split(".").reduce<unknown>((current, piece) => {
            if (current === null || current === undefined || typeof current !== "object") {
                return undefined;
            }

            return (current as Record<string, unknown>)[piece];
        }, root);
    }

    private matchesCondition(condition: Record<string, { gt?: number; lt?: number; eq?: number }>): boolean {
        return Object.entries(condition).every(([path, comparator]) => {
            const value = this.getValueAtPath(this.scenario.state, path);

            if (typeof value !== "number") {
                return false;
            }

            if (comparator.gt !== undefined && !(value > comparator.gt)) {
                return false;
            }

            if (comparator.lt !== undefined && !(value < comparator.lt)) {
                return false;
            }

            if (comparator.eq !== undefined && !(value === comparator.eq)) {
                return false;
            }

            return true;
        });
    }

    private evaluateGlobalRules(){
        if (!this.scenario?.global_rules?.length) {
            return;
        }

        for (const rule of this.scenario.global_rules as Rule[]) {
            if (this.triggeredGlobalRules.has(rule.rule_id)) {
                continue;
            }

            const allConditionsMet = (rule.condition ?? []).every((condition) => {
                return this.matchesCondition(condition as Record<string, { gt?: number; lt?: number; eq?: number }>);
            });

            if (allConditionsMet) {
                this.triggeredGlobalRules.add(rule.rule_id);
                eventBus.emit("globalRuleTriggered", { message: rule.text });
            }
        }
    }

    private moveToNode(nodeId:string){
        const node = this.scenario.nodes.findIndex(node => node.id == nodeId);
        this.scenario.current_node = node;
        if(this.scenario.nodes[this.scenario.current_node].options.length==0){
            eventBus.emit('end',null);
            return;
        }
        eventBus.emit("movedToNewNode",{nodeTitle:this.scenario.nodes[this.scenario.current_node].text});

        const current_node=this.getCurrentNode();

        if (current_node.form){
            this.clearTimeoutHandle();

            eventBus.emit("showAssessmentForm", {
                node: current_node,
                formId: current_node.form
            });

            return;
        }

        this.clearTimeoutHandle();
        this.startCurrentNodeTimeout();
    }

    private doEffects(eff:Effect[],action:ActionKey){
        console.log(eff.toString());
        console.log(Actions[action]);
        let noNextNode=true
        for(const effect of eff){
            switch (effect.type) {
                case "update_state":
                    this.assign(this.scenario.state,effect.path,effect.value);
                    break;
                case "score":
                    this.scenario.state.score+=effect.value
                    eventBus.emit("actionResult", { action: action, node: this.scenario.current_node, score: this.scenario.state.score, valid: true });
                    break;
                case "next_node":
                    noNextNode=false
                    this.moveToNode(effect.node_id);
                    break;
            
                default:
                    break;
            }
        }
        this.evaluateGlobalRules();

        if(noNextNode){
            eventBus.emit("end",null);
        }
        console.log("wtf");
    }


    public actionHappend(action:ActionKey) : Scenario|null{
        console.log(1);
        if(!this.scenario) return null;
        this.scenario.actionsTaken.push(action);
        const node:Node = this.getCurrentNode()
        if(node.options == null){
            return null;
        }
        console.log(2);
        console.log(JSON.stringify(node));

        for(const opt of node.options){
            console.log(JSON.stringify(opt));
            if(opt.action == action){
                this.doEffects(opt.effects,action);
                return this.scenario;
            }
        }
        
        this.scenario.state.score-=5;
        eventBus.emit("actionResult", { action: action, node: this.scenario.current_node, score: this.scenario.state.score,valid:false});
        return this.scenario;
    }

    public getEventsTillCurrent(): string[] {
        if (this.scenario == null) {
            console.log("No scenario");
            return [];
        }

        const events: string[] = [];

        let currentNodeIndex = 0;

        // Add starting node
        events.push(this.scenario.nodes[currentNodeIndex].text);

        for (const action of this.scenario.actionsTaken) {
            const currentNode = this.scenario.nodes[currentNodeIndex];

            if (!currentNode.options) {
                break;
            }

            const selectedOption = currentNode.options.find(
                option => option.action === action
            );

            // Ignore invalid actions
            if (!selectedOption) {
                continue;
            }

            const nextNodeId = selectedOption.effects.find(
                effect => effect.type === "next_node"
            )?.node_id;

            if (!nextNodeId) {
                break;
            }

            currentNodeIndex = this.scenario.nodes.findIndex(
                node => node.id === nextNodeId
            );

            if (currentNodeIndex === -1) {
                break;
            }

            events.push(this.scenario.nodes[currentNodeIndex].text);
        }

        return events.reverse();
    }

    public getDebrief(scen:Scenario) : Debrief{
        let good:number = 0;
        let bad:number = 0;
        const debrief:Debrief = {
            scenarioName:scen.title,
            goodPercent:0.0,
            taker:(scen.username || "XX"),
            score:scen.state.score,
            assessments: scen.state.assessment ?? [],
            timeline:[]
        }

        scen.current_node=0;
        let nodeTimeline:NodeTimelineSnapshot={
            duringNode:scen.nodes[scen.current_node].id,
            nodeText:scen.nodes[scen.current_node].text,
            nodeTimeline:[]
        }

        for(const action of scen.actionsTaken){
            let foundValid = false;
            const optionPool = scen.nodes[scen.current_node].options
            if(optionPool==undefined){
                break;
            }
            for(const option of optionPool){
                if(option.action==action){
                    good++;
                    foundValid=true;

                    nodeTimeline.nodeTimeline.push({action:Actions[action],valid:true,scoreDelta:(option.effects.find(ef=>ef.type=="score")?.value||0)})
                    
                    debrief.timeline.push(nodeTimeline);

                    const nextNode = option.effects.find(eff => eff.type == "next_node")?.node_id
                    
                    if(nextNode==null || nextNode==undefined){
                        break;
                    }
                    
                    scen.current_node = scen.nodes.findIndex(node=>node.id==nextNode)
                    
                    
                    nodeTimeline = {
                        duringNode: scen.nodes[scen.current_node].id,
                        nodeText: scen.nodes[scen.current_node].text,
                        nodeTimeline: []
                    }
                    break;
                }
            }
            if(! foundValid){
                bad++;
                nodeTimeline.nodeTimeline.push({ action:Actions[action], valid: false, scoreDelta: -5 });
            }
            
        }

        const percent = (good/(good+bad))*100.0
        debrief.goodPercent = percent;

        return debrief
    }
}

const engine = new Engine;
export default engine;