import { Box, Button, CardSection, Container, Grid, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";



function GroupExample(){
    return (
        <Group>
            <span>one</span>
            <span>two</span>
            <span>three</span>
        </Group>
    )
}

function StackExample() {
    return (
        <Stack>
            <span>one</span>
            <span>two</span>
            <span>three</span>
        </Stack>
    )
}

function Part1Lay(){
    return <>
        <Text>Group example</Text>
        <GroupExample />
        <Text>Stack example</Text>
        <StackExample />
    </>
}

function GroupRow({ label }) {
    return (
        <Group>
            <span>{label} A</span>
            <span>{label} B</span>
            <span>{label} C</span>
        </Group>
    );
}

function StackOfGroups() {
    return (
        <Stack>
            <GroupRow label="Row 1" />
            <GroupRow label="Row 2" />
            <GroupRow label="Row 3" />
        </Stack>
    );
}

function Part2Lay() {
    return (
        <Container>
            <Text>Container + Stack of Groups example</Text>
            <StackOfGroups />
        </Container>
    );
}

function GridExample({ showDebug }) {
    const colors = [
        "#ff6b6b",
        "#4dabf7",
        "#51cf66",
        "#ffd43b",
        "#845ef7",
    ];

    const boxStyle = (index) => ({
        backgroundColor: showDebug ? colors[index] : "transparent",
        padding: "10px",
        borderRadius: "6px",
        color: showDebug ? "white" : "inherit",
    });

    return (
        <Grid>
            <Grid.Col span={4}>
                <div style={boxStyle(0)}>Box 1</div>
            </Grid.Col>

            <Grid.Col span={4}>
                <div style={boxStyle(1)}>Box 2</div>
            </Grid.Col>

            <Grid.Col span={4}>
                <div style={boxStyle(2)}>Box 3</div>
            </Grid.Col>

            <Grid.Col span={6}>
                <div style={boxStyle(3)}>Box 4</div>
            </Grid.Col>

            <Grid.Col span={6}>
                <div style={boxStyle(4)}>Box 5</div>
            </Grid.Col>
        </Grid>
    );
}


function Part3Lay() {
    const [showGridDebug, setShowGridDebug] = useState(false);

    return (
        <Container>
            <Stack>
                <Text>Container + Stack + Grid example</Text>

                <Button onClick={() => setShowGridDebug(v => !v)}>
                    Toggle Grid Debug
                </Button>

                <GridExample showDebug={showGridDebug} />


            </Stack>
        </Container>
    );
}

function LayoutCheatSheet() {
    return (
        <Container size="md">
            <Stack gap="lg">

                {/* STACK */}
                <Box>
                    <Text fw={700}>Stack</Text>

                    <Text size="sm">
                        Vertical layout (items go top → bottom). Uses gap for spacing.
                    </Text>

                    <Stack gap="xs">
                        <Box bg="gray" p="xs">
                            <Text>Item 1</Text>
                        </Box>

                        <Box bg="gray" p="xs">
                            <Text>Item 2</Text>
                        </Box>

                        <Box bg="gray" p="xs">
                            <Text>Item 3</Text>
                        </Box>
                    </Stack>
                </Box>

                {/* GROUP */}
                <Box>
                    <Text fw={700}>Group</Text>

                    <Text size="sm">
                        Horizontal layout (items go left → right). Good for buttons, controls, rows.
                    </Text>

                    <Group gap="sm">
                        <Box bg="blue" p="xs">
                            <Text>A</Text>
                        </Box>

                        <Box bg="blue" p="xs">
                            <Text>B</Text>
                        </Box>

                        <Box bg="blue" p="xs">
                            <Text>C</Text>
                        </Box>
                    </Group>
                </Box>

                {/* GRID */}
                <Box>
                    <Text fw={700}>Grid</Text>

                    <Text size="sm">
                        12-column layout system. Used for responsive page structure.
                    </Text>

                    <Grid>
                        <Grid.Col span={10}>
                            <Box bg="green" p="xs">
                                <Text>Takes 10</Text>
                            </Box>
                        </Grid.Col>

                        <Grid.Col span={2}>
                            <Box bg="green" p="xs">
                                <Text>Takes 2</Text>
                            </Box>
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <Box bg="green" p="xs">
                                <Text>
                                    Does not fit above because 12 columns are already filled
                                </Text>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Box>

                {/* CONTAINER */}
                <Box>
                    <Text fw={700}>Container</Text>

                    <Text size="sm">
                        Centers content and limits max width so layouts don’t stretch too wide.
                    </Text>

                    <Text size="sm">
                        Used to wrap your entire screen or page content.
                    </Text>
                </Box>

                {/* BOX */}
                <Box>
                    <Text fw={700}>Box</Text>

                    <Text size="sm">
                        Box is the basic building block in Mantine, similar to a div in vanilla HTML.
                    </Text>
                </Box>

            </Stack>
        </Container>
    );
}

const parts=4

function hasPrev(x){
    return x>0?true:false
}

function hasNext(x) {
    return x < parts-1 ? true : false
}

export default function Course1(){
    const [curr,setCurr]=useState(0);


    return(
        <>
            <Group>
                <Button onClick={()=>{setCurr(curr-1)}} disabled={!hasPrev(curr)}><Text>{"<-"}</Text></Button>
                <Button onClick={() => { setCurr(curr + 1) }} disabled={!hasNext(curr)}><Text>{"->"}</Text></Button>
            </Group>
            {curr === 0 && (
                <Part1Lay></Part1Lay>
            )}

            {curr === 1 && (
                <Part2Lay></Part2Lay>
            )}

            {curr === 2 && (
                <Part3Lay></Part3Lay>
            )}

            {curr === 3 && (
                <LayoutCheatSheet></LayoutCheatSheet>
            )}
        </>
    )
}

