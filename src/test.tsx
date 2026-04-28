import {OverlayImage} from './common/overlayHotspot';



export default function TestImage(){
    return(
        <OverlayImage src='/testImage.jpg' 
        hotspots={
            [
                {
                    x:10,
                    y:10,
                    content:null,
                    onClick:null
                },
                {
                    x: 50,
                    y: 50,
                    content: null,
                    onClick: null
                },
                {
                    x: 10,
                    y: 70,
                    content: null,
                    onClick: null
                }, 
                {
                    x: 93,
                    y: 47,
                    content: null,
                    onClick: ()=>{console.log("JEW JEW JEW JEW")}
                }
            ]
        }
        ></OverlayImage>
    )
}