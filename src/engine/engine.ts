import eventBus from "../common/eventBus";
import type { Action } from "./schemas/actionEnum";
import { type Scenario,type Node, type Effect } from "./types";

export class Engine{
    scenario!:Scenario
    constructor(){
        console.log("Engine made");
    }

    setScenario(scen:Scenario){
        this.scenario=scen;
        eventBus.emit("movedToNewNode", { nodeTitle: this.scenario.nodes[this.scenario.current_node].text });
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

    private moveToNode(nodeId:string){
        const node = this.scenario.nodes.findIndex(node => node.id == nodeId)
        this.scenario.current_node = node;
        eventBus.emit("movedToNewNode",{nodeTitle:this.scenario.nodes[this.scenario.current_node].text});
    }

    private doEffects(eff:Effect[],action:Action){
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
        if(noNextNode){
            eventBus.emit("end",null);
        }
    }


    public actionHappend(action:Action) : Scenario|null{
        if(!this.scenario) return null;
        const node:Node = this.getCurrentNode()
        if(node.options == null){
            return null;
        }

        for(const opt of node.options){
            if(opt.action == action){
                this.doEffects(opt.effects,action);
                return this.scenario;
            }
        }
        
        this.scenario.state.score-=5;
        eventBus.emit("actionResult", { action: action, node: this.scenario.current_node, score: this.scenario.state.score,valid:false});
        return this.scenario;
    }

    public getEventsTillCurrent() : string[]{
        if(this.scenario==null){ 
            console.log("No scenario");
            return [];
        }

        //will need to decide on a path keeping strategy for now we bring them all
        const arr = [];
        for(let i=this.scenario.current_node;i>=0;i--){
            arr.push(this.scenario.nodes[i].text);
        }
        
        return arr;
    }

    testGetInfo(){
        console.log("Score: "+this.scenario.state.score);
        const node = this.getCurrentNodeInfo();
        console.log("Current node [" + node[0] + "] " + node[1])
        console.table(this.scenario.state.vitals);
        
    }

    getCurrentNodeInfo(){
        const curNode = this.getCurrentNode()
        return [curNode.id,curNode.text] 
    }
}

const engine = new Engine;
export default engine;