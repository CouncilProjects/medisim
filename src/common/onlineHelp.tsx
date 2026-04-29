import { Box, Card, Divider, Group, Highlight, Input, Stack,Text, Title } from "@mantine/core"
import { IconAlertHexagon } from "@tabler/icons-react" 
import { useState } from "react";

export type Step = {
    stepContent: string;
    important?: boolean;
};

export type Section = {
    title: string;
    steps: Step[];
};

export type PageHelp = {
    activeSections: Section[];
    pageTitle: string;
};

type SectionRenderProps = {
    sect: Section;
    words: string[];
};

function SectionRender({ sect, words }: SectionRenderProps) {
    return (
        <Box mb={8}>
            <HighlightText text={sect.title} highlight={words} />

            <Stack>
                {sect.steps.map((step, index) => (
                    <Group
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text display={'inline-flex'}>
                            {"[" + (index + 1) + "]-  "}
                            <HighlightText text={step.stepContent} highlight={words} />
                            {step.important && <IconAlertHexagon size={32} display={'span'} color="red" />}
                        </Text>
                    </Group>
                ))}
            </Stack>
        </Box>
    );
}



type OnlineHelpProps = {
    pageHelp: PageHelp;
};

export function OnLineHelp({ pageHelp }: OnlineHelpProps) {
    const [keyword,setKeyword] = useState<string[]>([]);

    return (
        <Card mah="70dvh" style={{ overflowY: "auto" }}>
            <Title>
                <HighlightText text={`On-line help for ${pageHelp.pageTitle}`} highlight={keyword} />
            </Title>
            <Divider></Divider>
            <Input type="text" value={keyword.join(' ')} placeholder="Search..." onChange={(ev)=>{setKeyword(ev.currentTarget.value.split(' '))}}></Input>

            {pageHelp.activeSections.map((section, i) => (
                <div key={i}>
                    <SectionRender sect={section} words={keyword} />
                    <Divider color="red" />
                </div>
            ))}
        </Card>
    );
}



type HighlightTextProps = {
    text: string;
    highlight: string[];
};

function HighlightText({ text, highlight }: HighlightTextProps) {
    return (
        <Highlight highlight={highlight}>
            {text}
        </Highlight>
    );
}