import {Paper, Center, Box,Text } from "@mantine/core";


interface VialButtonProps {
    label: string;
    subtitle: string;
    onClick: () => void;
    imageSrc: string;
}


// const params = useParams();
export function VialButton({ label, subtitle, onClick, imageSrc }: VialButtonProps) {
    return (
        <Paper
            onClick={onClick}
            withBorder
            style={{
                cursor: 'pointer',
                background: '#141414',
                borderColor: '#222',
                borderRadius: 8,
                overflow: 'hidden',
                transition: 'transform 0.1s ease, border-color 0.1s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#444')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#222')}
        >
            {/* Reduced height to 90 to prevent scrolling while keeping the image prominent */}
            <Center h={90} bg="#0a0a0a" p={8}>
                <img
                    src={imageSrc}
                    alt={label}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        display: 'block',
                    }}
                />
            </Center>

            <Box px={8} py={6} style={{ borderTop: '1px solid #222' }}>
                <Text fw={600} c="gray.3" style={{ lineHeight: 1.2, fontSize: 12 }}>
                    {label}
                </Text>
                <Text c="dimmed" tt="uppercase" style={{ fontSize: '9px', letterSpacing: 0.4, marginTop: 2 }}>
                    {subtitle}
                </Text>
            </Box>
        </Paper>
    );
}