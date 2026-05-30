import { useEffect, useRef, useState } from "react";


export function useFlashOnChange(value,duration){
    console.log("I was used as a hook");
    // i want this to be causing ui changes so i need a state
    const [flash,setFlash] = useState(false);

    //i also want to store the previous value, and not cause rerender and persist acrooss rerenders
    // that is why we need a ref
    const previous = useRef("");

    //now i need to react when the value changes

    useEffect(()=>{
        if(previous.current!=value){
            if(previous.current.length==0){
                previous.current=value;
                return;
            }
            previous.current = value;
            setFlash(true);
            let unsub = setTimeout(()=>{setFlash(false)},duration);

            return ()=>{
                clearTimeout(unsub);
            }
        }
    },[value]);

    return flash;

}