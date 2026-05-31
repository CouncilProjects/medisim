import { useEffect, useRef, useState } from "react";


export function useFlashOnChange<T>(value:T,duration:number){
    console.log("I was used as a hook");
    // i want this to be causing ui changes so i need a state
    const [flash,setFlash] = useState(false);

    //i also want to store the previous value, and not cause rerender and persist acrooss rerenders
    // that is why we need a ref
    const previous = useRef<T>(null);

    //now i need to react when the value changes

    useEffect(()=>{
        if(previous.current!=value){
            if(previous.current == null){
                previous.current=value;
                return;
            }
            previous.current = value;
            setFlash(true);
            const unsub = setTimeout(()=>{setFlash(false)},duration);

            return ()=>{
                clearTimeout(unsub);
            }
        }
    },[value,duration]);

    return flash;

}