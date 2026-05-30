import { useClickOutside, useLocalStorage } from '@mantine/hooks';
import React, { useState } from 'react';
import eventBus from '../../common/eventBus';
import { Actions } from '../../engine/schemas/actionEnum';
import { Button, Center, Stack,Text } from '@mantine/core';
import { useNavigate, useOutletContext } from 'react-router';
import type { Vitals } from '../../engine/types';
import { useFlashOnChange } from '../../hooks/flashOnChange';

export default function VitalScreen() {
    const context = useOutletContext<Vitals>();
    const nav = useNavigate();

    const hrFlash = useFlashOnChange(context.hr.value,500);

    const bpFlash = useFlashOnChange(context.bp.value, 500);

    const tempFlash = useFlashOnChange(context.temp.value, 500);

    const ref = useClickOutside(() => nav(-1));
    

    return (
        <Center w="100%"  h="100%">
            <Stack ref={ref} bg={'dark'} p={4} gap="md">
                <Text fw={700} size="lg">Vitals & shock Controls</Text>
                <Text fw={300} size="md" bg={hrFlash ? 'orange' : 'transparent'}>Heart rate : {context.hr.value} currently {context.hr.state}</Text>
                <Text fw={300} size="md" bg={bpFlash ? 'orange' : 'transparent'}>Temprature : {context.temp.value} currently {context.temp.state}</Text>
                <Text fw={300} size="md" bg={tempFlash ? 'orange' : 'transparent'}>Blood preasure : {context.bp.value} currently {context.bp.state}</Text>
                <Button color="red" onClick={() => eventBus.emit("buttonPressed", { action: Actions.shock })}>
                    Shock
                </Button>
                <Button color="red" variant="light" onClick={() => eventBus.emit("buttonPressed", { action: Actions.shockLight })}>
                    Shock Light
                </Button>
            </Stack>
        </Center>
    );
}