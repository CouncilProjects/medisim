import React from 'react';
import { Stack, Group, Button, Text, Divider } from '@mantine/core';
import { Actions } from '../../engine/schemas/actionEnum';
import eventBus from '../../common/eventBus';

export default function CabinetScreen() {
    return (
        <Stack bg={'dark'} p={4} gap="md">
            <Text fw={700} size="lg">Medicine Cabinet & Procedures</Text>

            {/* Painkillers */}
            <Group grow>
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.painkillers })}>
                    Painkillers
                </Button>
                <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.painkillersLight })}>
                    Painkillers Light
                </Button>
            </Group>

            <Divider />

            {/* Blood Pressure */}
            <Text size="sm" fw={500} c="dimmed">Blood Pressure Controls</Text>
            <Group grow gap="xs">
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.bloodPressureUp })}>
                    BP Up
                </Button>
                <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.bloodPressureUpLight })}>
                    BP Up Light
                </Button>
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.bloodPressureDown })}>
                    BP Down
                </Button>
                <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.bloodPressureDownLight })}>
                    BP Down Light
                </Button>
            </Group>

            <Divider />

            {/* Temperature */}
            <Text size="sm" fw={500} c="dimmed">Temperature Controls</Text>
            <Group grow gap="xs">
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.tempUp })}>
                    Temp Up
                </Button>
                <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.tempUpLight })}>
                    Temp Up Light
                </Button>
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.tempDown })}>
                    Temp Down
                </Button>
                <Button variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.tempDownLight })}>
                    Temp Down Light
                </Button>
            </Group>

            <Divider />

            {/* Misc Procedures */}
            <Group grow>
                <Button variant="outline" color="gray" onClick={() => eventBus.emit("buttonPressed", { action: Actions.wait })}>
                    Wait
                </Button>
                <Button variant="outline" onClick={() => eventBus.emit("buttonPressed", { action: Actions.callDoctor })}>
                    Call Doctor
                </Button>
                <Button variant="outline" onClick={() => eventBus.emit("buttonPressed", { action: Actions.doTests })}>
                    Do Tests
                </Button>
            </Group>
        </Stack>
    );
}