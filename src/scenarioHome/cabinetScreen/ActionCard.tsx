import { Paper, Stack, Box,Text } from "@mantine/core";


interface ActionCardProps {
    label: string;
    color: string;
    icon: React.ReactNode;
    onClick: () => void;
}

export function ActionCard({ label, color, icon, onClick }: ActionCardProps) {
    return (
        <Paper
            p="xs"
            withBorder
            onClick={onClick}
            style={{
                cursor: 'pointer',
                background: '#141414',
                borderColor: '#222',
                borderRadius: 8,
                minHeight: 65,
                transition: 'border-color 0.1s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#222')}
        >
            <Stack align="center" justify="center" h="100%" gap={4}>
                <Box style={{ color }}>
                    {icon}
                </Box>
                <Text fw={600} ta="center" c="gray.3" style={{ lineHeight: 1, fontSize: 11 }}>
                    {label}
                </Text>
            </Stack>
        </Paper>
    );
}