import eventBus from "../common/eventBus";

export class Logger{
    private name:string
    private logs:string[];

    private unregister1;
    private unregister2;

    constructor(n:string){
        this.name=n;
        this.logs=[];
        this.unregister1 = eventBus.on("actionResult",({action,node,score,valid})=>{this.logs.push("At node "+node+" action "+action+" caused score to become "+score+" it was "+(valid?"valid":"not valid"))});
        this.unregister2 = eventBus.on("end",()=>{this.printLogs()})
    }

    private printLogs(){
        console.log("Logs of logger : "+this.name);
        for(let log of this.logs){
            console.log(log);
        }
    }
}