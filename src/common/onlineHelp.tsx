import { Box, Card, Divider, Group, Stack,Text, Title } from "@mantine/core"
import { IconAlertHexagon } from "@tabler/icons-react" 

export type Step ={
    stepContent:String,
    important?:Boolean
}

export type Section = {
    title:String,
    steps:Step[]
}

export type PageHelp={
    activeSections:Section[]
    pageTitle:String
}

type sectionRenderProps = {
    sect:Section
}
function SectionRender({sect}:sectionRenderProps){
    return(
        <Box mb={8}>
            <Text size="lg" fw={700}>{sect.title}</Text>
            <Stack>
                {sect.steps.map((step,index)=>
                    <Group
                        key={index}
                        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                    >
                        
                        <Text style={{verticalAlign:'middle'}}> [{index + 1}] {step.stepContent} {step.important && <IconAlertHexagon color="red" />}</Text>
                    </Group>
                    )
                }
            </Stack>
        </Box>
    )
}

type onlineHelpProps = {
    pageHelp:PageHelp
}

export function OnLineHelp({pageHelp}:onlineHelpProps){
    return(
        <Card mah={'70dvh'} style={{ overflowY:"auto"}}>
            <Title>On-line help for {pageHelp.pageTitle}</Title>
            {pageHelp.activeSections.map(section=>
                <>
                    <SectionRender sect={section}></SectionRender>
                    <Divider color="red"></Divider>
                </>
            )}
        </Card>
    )
}