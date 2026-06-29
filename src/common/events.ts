import type { Action, ActionKey } from "../engine/schemas/actionEnum";
import type { Assessment, Node } from "../engine/types";

export type AppEvents = {
    end:null,
    buttonPressed:{action:ActionKey}
    actionResult:{action:ActionKey,node:number,score:number,valid:boolean}
    movedToNewNode:{nodeTitle:string}
    nodeEntered: {timeout:number},
    triggerTimeout:null,
    showAssessmentForm: {node: Node, formId: string;},
    assessmentSubmitted: {assessment: Assessment},
    globalRuleTriggered: {message: string},
};