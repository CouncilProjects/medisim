import { Box,Button,Image } from "@mantine/core"


type Hotspot={
    x:number,
    y:number,
    content:any
    onClick:any
}

type overlayProps={
    src:string,
    hotspots:Hotspot[]
}

export function OverlayImage({src,hotspots}:overlayProps){
    return(
        <Box pos={'relative'} display={"inline-block"}>
            <Image width={"100%"} height={"100%"} src={src} alt={"Image"}></Image>

            {hotspots.map((spot,index)=>
                <Button
                    key={index}
                    pos="absolute"
                    onClick={spot.onClick}
                    top={spot.y + "%"}
                    left={spot.x + "%"}
                    w="50px"
                    h="50px"
                    bg="transparent"
                    bd="2px solid gold"
                    style={{
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 10px 3px rgba(255, 215, 0, 0.8)"
                    }}
                />
            )}
        </Box>
    )
}