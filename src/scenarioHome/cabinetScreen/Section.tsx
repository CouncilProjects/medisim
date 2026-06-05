import { Stack,Text } from "@mantine/core";


interface SectionProps {
    title: string;
    color: string;
    children: React.ReactNode;
}

export function Section({ title, color, children }: SectionProps) {
    return (
        <Stack gap={6}>
            <Text fw={700} c={color} tt="uppercase" style={{ letterSpacing: 0.8, fontSize: 11 }}>
                {title}
            </Text>
            {children}
        </Stack>
    );
}