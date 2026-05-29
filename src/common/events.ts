import type { Action } from "../engine/schemas/actionEnum";

export type AppEvents ={
    end:null,
    buttonPressed:{action:Action}
    actionResult:{action:Action,node:number,score:number,valid:boolean}
    movedToNewNode:{nodeTitle:string}
};