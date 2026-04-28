import { Box, Button, Container, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useThemeColor } from "../hooks/themeHook";

/* =========================
   COURSE PAGE
========================= */
export default function ColorCourse() {
    const [curr, setCurr] = useState(0);

    const parts = 3;

    const hasPrev = (x) => x > 0;
    const hasNext = (x) => x < parts - 1;

    return (
        <>
            {/* NAVIGATION */}
            <Group justify="center" mb="lg">
                <Button
                    onClick={() => setCurr(curr - 1)}
                    disabled={!hasPrev(curr)}
                >
                    {"<-"}
                </Button>

                <Button
                    onClick={() => setCurr(curr + 1)}
                    disabled={!hasNext(curr)}
                >
                    {"->"}
                </Button>
            </Group>

            {/* PART 1 */}
            {curr === 0 && (
                <Container size="md">
                    <Stack>
                        <Text fw={700}>1. Color Scale System</Text>

                        <Text size="sm">
                            Mantine does NOT use single colors. Instead it uses
                            10-step palettes (0–9).
                        </Text>

                        <Box bg="blue.1" p="xs"><Text>blue.1 (very light)</Text></Box>
                        <Box bg="blue.4" p="xs"><Text>blue.4 (base range)</Text></Box>
                        <Box bg="blue.7" p="xs"><Text>blue.7 (strong)</Text></Box>
                        <Box bg="blue.9" p="xs"><Text>blue.9 (very dark)</Text></Box>
                    </Stack>
                </Container>
            )}

            {/* PART 2 */}
            {curr === 1 && (
                <Container size="md">
                    <Stack>
                        <Text fw={700}>2. Dark / Light Mode Behavior</Text>

                        <Text size="sm">
                            Colors do NOT change between themes. blue.4 is always blue.4.
                            Only UI context changes.
                        </Text>

                        <Box bg="blue.4" p="xs">
                            <Text>Same color in light mode</Text>
                        </Box>

                        <Box bg="blue.4" p="xs">
                            <Text>Same color in dark mode</Text>
                        </Box>
                    </Stack>
                </Container>
            )}

            {/* PART 3 */}
            {curr === 2 && (
                <Container size="md">
                    <Stack>
                        <Text fw={700}>3. autoContrast System</Text>

                        <Text size="sm">
                            autoContrast only decides text readability based on background luminance.
                            It does NOT change actual colors.
                        </Text>

                        <Box bg="dark.9" p="xs">
                            <Text>
                                Dark background → light text automatically
                            </Text>
                        </Box>

                        <Box bg="gray.1" p="xs">
                            <Text>
                                Light background → dark text automatically
                            </Text>
                        </Box>
                    </Stack>
                </Container>
            )}
        </>
    );
}

/* =========================
   HOOK EXAMPLE
========================= */
function ThemeHookExample() {
    const color = useThemeColor("red", "blue");

    return (
        <Text c={color}>
            Red in light mode → Blue in dark mode
        </Text>
    );
}