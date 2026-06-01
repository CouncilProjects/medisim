import type { AppEvents } from "./events";

//for more info on event busses. 
//https://dev.to/mohsenfallahnjd/javascript-event-bus-js-typescript-17jp

type EventCallback<T> = (params: T) => void;


class EventBusClass{
    //private eventMap:Map<string,eventCallback[]>;
    private eventMap:{ [K in keyof AppEvents] ?: Array<{callback:EventCallback<AppEvents[K]>,id:number}> } = {}
    private callBackId:number;
    
    constructor(){
        this.callBackId=0;
    }


    public on<K extends keyof AppEvents>(event:K,callback:EventCallback<AppEvents[K]>) : ()=>void{
        console.log("Added listener for "+event);
        if(!this.eventMap[event]){
            this.eventMap[event] = [];
        }
        const id = this.callBackId++;

        (this.eventMap[event] as {callback:EventCallback<AppEvents[K]>,id:number}[]).push({callback,id});

        console.log("Event registered for " + event);

        return ()=>{this.removeCallback(event,id)}
    }

    private removeCallback<K extends keyof AppEvents>(event:K,id:number){
        const list = this.eventMap[event];
        // @ts-expect-error eventMap index write is intentionally unsafe
        this.eventMap[event]=list.filter(call=>call.id!=id);
    }

    public emit<K extends keyof AppEvents>(event: K,params: AppEvents[K]){
        const callbacks = this.eventMap[event];
        if(callbacks==null || callbacks==undefined){
            return;
        }
        
        this.eventMap[event]?.forEach(callback=>{
            callback.callback(params);
        })
    }
}
const eventBus = new EventBusClass();

export default eventBus;

