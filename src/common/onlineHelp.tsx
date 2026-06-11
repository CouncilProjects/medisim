import { Box, Card, Group, Highlight, ScrollArea, Stack, Text, TextInput } from "@mantine/core";
import { IconAlertHexagon } from "@tabler/icons-react";
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
        <Box mb="md">
            {/* Improved Section Title Typography */}
            <Text 
                fw={600} 
                size="lg" 
                mb="sm" 
                style={{ color: '#deeaf7', letterSpacing: '0.3px' }}
            >
                <HighlightText text={sect.title} highlight={words} />
            </Text>

            <Stack gap="sm">
                {sect.steps.map((step, index) => (
                    <Group
                        key={index}
                        wrap="nowrap"
                        align="flex-start"
                        gap="sm"
                        style={{
                            // Subtle highlight for important steps
                            backgroundColor: step.important ? 'rgba(250, 82, 82, 0.04)' : 'transparent',
                            padding: step.important ? '8px 12px' : '4px 8px',
                            borderRadius: '8px',
                            borderLeft: step.important ? '2px solid #fa5252' : '2px solid transparent',
                            transition: 'background-color 0.2s ease',
                        }}
                    >
                        {/* Custom geometric bullet point instead of " - " */}
                        <Box 
                            mt={8} 
                            style={{ 
                                width: 6, 
                                height: 6, 
                                borderRadius: '50%', 
                                backgroundColor: step.important ? '#fa5252' : '#8ea4bc',
                                flexShrink: 0
                            }} 
                        />
                        
                        {/* Step Text container allows clean text wrapping */}
                        <Box style={{ flex: 1 }}>
                            <Text size="sm" style={{ color: '#a6b7cb', lineHeight: 1.5 }}>
                                <HighlightText text={step.stepContent} highlight={words} />
                            </Text>
                        </Box>

                        {/* Warning Icon styled and aligned properly */}
                        {step.important && (
                            <Box mt={2} style={{ flexShrink: 0 }}>
                                <IconAlertHexagon size={20} color="#fa5252" />
                            </Box>
                        )}
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
    const [keyword, setKeyword] = useState<string[]>([]);

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* 1. Header & Search Area */}
            <Card 
                p="md" 
                mb="lg" 
                radius="md"
                style={{ 
                    backgroundColor: '#1a2432', 
                    border: '1px solid #3a5375',
                    overflow: 'visible'
                }}
            >
                <Text 
                    size="m" 
                    fw={700} 
                    mb="xs"
                    style={{ 
                        color: '#8ea4bc',  
                        letterSpacing: '1px'
                    }}
                >
                    <HighlightText text={`Οδηγος για την σελιδα: ${pageHelp.pageTitle}`} highlight={keyword} />
                </Text>
                
                <TextInput 
                    placeholder="Αναζήτηση όρου ή λειτουργίας..." 
                    value={keyword.join(' ')} 
                    onChange={(ev) => setKeyword(ev.currentTarget.value.split(' '))}
                    radius="md"
                    size="md"
                    styles={{
                        input: {
                            backgroundColor: '#0f1722',
                            border: '1px solid #2b5797', 
                            color: '#deeaf7',
                            transition: 'border-color 0.2s ease',
                        }
                    }}
                    leftSection={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c7899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    }
                />
            </Card>

            {/* 2. Κυλιόμενο Περιεχόμενο (Scroll Area) */}
            <ScrollArea h="55vh" offsetScrollbars type="auto" styles={{ viewport: { paddingRight: 16 } }}>
                <Stack gap="xl" pl="sm" pb="md">
                    {pageHelp.activeSections.map((section, i) => (
                        <Box 
                            key={i}
                            style={{
                                borderLeft: '3px solid #c4813e',
                                paddingLeft: '20px', // Increased padding for breathing room
                                backgroundColor: 'transparent'
                            }}
                        >
                            <SectionRender sect={section} words={keyword} />
                        </Box>
                    ))}
                </Stack>
            </ScrollArea>
        </Box>
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