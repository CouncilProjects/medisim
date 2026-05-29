import { useLocalStorage } from '@mantine/hooks';
import React, { useState } from 'react';
import eventBus from '../../common/eventBus';
import { Actions } from '../../engine/schemas/actionEnum';
import { Button, Stack,Text } from '@mantine/core';

export default function VitalScreen() {
    return (
        <Stack bg={'dark'} p={4} gap="md">
            <Text fw={700} size="lg">Vitals & shock Controls</Text>
            <Button color="red" onClick={() => eventBus.emit("buttonPressed", { action: Actions.shock })}>
                Shock
            </Button>
            <Button color="red" variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.shockLight })}>
                Shock Light
            </Button>
        </Stack>
    );
}