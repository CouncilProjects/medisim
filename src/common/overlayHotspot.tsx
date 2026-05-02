import { Box,Button,Group,Image, Kbd, Tooltip } from "@mantine/core"
import { useDisclosure, useHotkeys, useViewportSize } from "@mantine/hooks"
import { useEffect, useRef, useState } from "react"


type Hotspot={
    x:string,
    y:string,
    w:number,
    h:number
    content:any
    onClick:()=>void
}

export function makeHotspot(x:number,y:number,onClick:()=>void,content:string|null=null,w=50,h=50) : Hotspot{
    return {x:x+"%",y:y+"%",h:h,w:w,onClick:onClick,content:content}
}

type overlayProps={
    src:string,
    hotspots:Hotspot[]
}

export function OverlayImage({src,hotspots}:overlayProps){
    const [showGlow,glowHandle] = useDisclosure(false);
    const imageRef = useRef<HTMLImageElement|null>(null)
    useHotkeys([
        ['shift+s', () => glowHandle.toggle()],
    ]);
    const { height, width } = useViewportSize();
    const [scaleW,setScaleW] = useState(1.0);
    const [scaleH,setScaleH] = useState(1.0);
    const [scalePos, setScalePos] = useState(1.0);

    useEffect(() => {
        const img = imageRef.current;
        if (!img) return;

        const handleLoad = () => {
            setScaleW(img.clientWidth/img.naturalWidth);
            setScaleH(img.clientHeight / img.naturalHeight);
            
        };

        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener("load", handleLoad);
            return () => img.removeEventListener("load", handleLoad);
        }
    }, [height,width]);

    <style>
        {`
      @keyframes pulseGlow {
        0% {
          box-shadow: 0 0 0px 0px rgba(255, 215, 0, 0.6);
        }
        50% {
          box-shadow: 0 0 18px 6px rgba(255, 215, 0, 0.9);
        }
        100% {
          box-shadow: 0 0 0px 0px rgba(255, 215, 0, 0);
        }
      }
    `}
    </style>

    return(
        <Box w={"100%"} h={"100%"} pos={'relative'} display={"inline-block"}>
            <Image ref={imageRef} width={"100%"} height={"100%"} src={src} alt={"Image"}></Image>

            {hotspots.map((spot,index)=>
               <Tooltip label={spot.content}>
                    <Button
                        key={index}
                        pos="absolute"
                        onClick={spot.onClick}
                        top={spot.y}
                        left={spot.x}
                        w={(spot.w * scaleW)+"px"}
                        h={(spot.h * scaleH)+"px"}
                        bg="transparent"
                        bd={showGlow?"2px solid gold":"none"}
                        styles={{
                            root:{
                                boxShadow: showGlow ? '0 0 10px 3px rgba(255, 215, 0, 0.8)' : 'none',
                                transform:"translate(-50%, -50%)",
                                transition:"pulseGlow 0.2 ease"
                            }
                        }}
                    />
               </Tooltip>
            )}
        </Box>
    )
}


