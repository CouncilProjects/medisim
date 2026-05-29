import React from 'react';
import { Stack, Group, Button, Text } from '@mantine/core';
import { Actions } from '../../engine/schemas/actionEnum';
import eventBus from '../../common/eventBus';

export default function VentilationScreen() {
    return (
        <Stack bg={'dark'} p={4} gap="md">
            <Text fw={700} size="lg">Ventilation Controls</Text>

            <Group grow>
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxygenDensityUp })}>
                    Oxygen Density Up
                </Button>
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxygenDensityDown })}>
                    Oxygen Density Down
                </Button>
            </Group>

            <Group grow>
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxyPumpsUp })}>
                    Oxy Pumps Up
                </Button>
                <Button onClick={() => eventBus.emit("buttonPressed", { action: Actions.oxyPumpsDown })}>
                    Oxy Pumps Down
                </Button>
            </Group>
        </Stack>
    );
}