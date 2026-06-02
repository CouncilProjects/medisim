import React from 'react';
import { Stack, Group, Button, Text, Divider, Center, rgba } from '@mantine/core';
import { Actions } from '../../engine/schemas/actionEnum';
import eventBus from '../../common/eventBus';
import { useClickOutside } from '@mantine/hooks';
import { useNavigate } from 'react-router';

export default function CabinetScreen() {
    const nav = useNavigate();
    const ref = useClickOutside(() => nav(-1));

    return (
        <Center w="100%"  h="100%" bg={rgba('dark',0.6)}>
            <Stack ref={ref} bg={'dark'} p={4} gap="md">
                <Text fw={700} size="lg">Medicine Cabinet & Procedures</Text>

                {/* Painkillers */}
                <Group grow>
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: "painkillers" })}>
                        Painkillers
                    </Button>
                    <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: "painkillersLight" })}>
                        Painkillers Light
                    </Button>
                </Group>

                <Divider />

                {/* Blood Pressure */}
                <Text size="sm" fw={500} c="dimmed">Blood Pressure Controls</Text>
                <Group grow gap="xs">
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: "bloodPressureUp" })}>
                        BP Up
                    </Button>
                    <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action:"bloodPressureUpLight" })}>
                        BP Up Light
                    </Button>
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: "bloodPressureDown" })}>
                        BP Down
                    </Button>
                    <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: "bloodPressureDownLight" })}>
                        BP Down Light
                    </Button>
                </Group>

                <Divider />

                {/* Temperature */}
                <Text size="sm" fw={500} c="dimmed">Temperature Controls</Text>
                <Group grow gap="xs">
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: "tempUp" })}>
                        Temp Up
                    </Button>
                    <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: "tempUpLight" })}>
                        Temp Up Light
                    </Button>
                    <Button onClick={() => eventBus.emit("buttonPressed", { action: "tempDown" })}>
                        Temp Down
                    </Button>
                    <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: "tempDownLight" })}>
                        Temp Down Light
                    </Button>
                </Group>

                <Divider />

                {/* Misc Procedures */}
                <Group grow>
                    <Button variant="outline" color="gray" onClick={() => eventBus.emit("buttonPressed", { action: "wait" })}>
                        Wait
                    </Button>
                    <Button variant="outline" onClick={() => eventBus.emit("buttonPressed", { action: "callDoctor" })}>
                        Call Doctor
                    </Button>
                    <Button variant="outline" onClick={() => eventBus.emit("buttonPressed", { action: "doTests" })}>
                        Do Tests
                    </Button>
                </Group>

                <Group grow>
                    <Button variant="outline" onClick={() => eventBus.emit("buttonPressed", { action: 'bloodTest' })}>
                        blood test
                    </Button>
                    <Button variant="outline" onClick={() => eventBus.emit("buttonPressed", { action: 'cholesterolTest' })}>
                        Cholesterol test
                    </Button>
                </Group>
            </Stack>
        </Center>
    );
}