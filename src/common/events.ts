import type { Action, ActionKey } from "../engine/schemas/actionEnum";

export type AppEvents ={
    end:null,
    buttonPressed:{action:ActionKey}
    actionResult:{action:ActionKey,node:number,score:number,valid:boolean}
    movedToNewNode:{nodeTitle:string}
    nodeEntered: {timeout:number},
    triggerTimeout:null
};