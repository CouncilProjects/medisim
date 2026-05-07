import { Box,Button,Group,Image, Kbd, Tooltip } from "@mantine/core"
import { useDisclosure, useHotkeys, useViewportSize } from "@mantine/hooks"
import { useEffect, useRef, useState } from "react"


type Hotspot={
    x:number,
    y:number,
    w:number,
    h:number
    content:any
    onClick:()=>void
}

export function makeHotspot(x:number,y:number,onClick:()=>void,content:string|null=null,w=50,h=50) : Hotspot{
    return {x:x,y:y,h:h,w:w,onClick:onClick,content:content}
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
    
    const [layout,setLayout] = useState({
        w:0,
        h:0,
        naturalW:0,
        naturalH:0
    })

    

    useEffect(() => {
        const img = imageRef.current;
        if(!img) return;

        const update = ()=>{
            setLayout({
                w:img.clientWidth,
                h:img.clientHeight,
                naturalW:img.naturalWidth,
                naturalH:img.naturalHeight
            });
        }

        update();
        
        const observer = new ResizeObserver(update);
        observer.observe(img);

        return ()=>observer.disconnect()
    }, []);

    const scale = Math.max(
        layout.w / layout.naturalW,
        layout.h / layout.naturalH
    );

    const renderedW = layout.naturalW * scale;
    const renderedH = layout.naturalH * scale;

    const offsetX = (layout.w - renderedW) / 2;
    const offsetY = (layout.h - renderedH) / 2;

    return(
        <Box w={"100%"} h={"100%"}  pos={'relative'} display={"inline-block"}>
            <Image ref={imageRef} width={"100%"} height={"100%"} src={src} alt={"Image"} fit="cover"></Image>

            {hotspots.map((spot,index)=>{
                const x = spot.x * renderedW + offsetX;
                const y = spot.y * renderedH + offsetY;

                return (<Tooltip label={spot.content||"Unknown"} withArrow transitionProps={{transition:'fade-up',duration:200}}>
                    <Button
                        key={index}
                        pos="absolute"
                        onClick={spot.onClick}
                        top={y}
                        left={x}
                        w={(spot.w*scale)+"px"}
                        h={(spot.h*scale)+"px"}
                        bg="transparent"
                        bd={showGlow?"2px solid gold":"none"}
                        styles={{
                            root:{
                                boxShadow: showGlow ? '0 0 10px 3px rgba(155, 215, 0, 0.8)' : 'none',
                                transform:"translate(-50%, -50%)",
                            }
                        }}
                    />
               </Tooltip>);
            })}
        </Box>
    )
}


