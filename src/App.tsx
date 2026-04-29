import { useEffect, useState } from 'react'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { AppShell, Box, Burger, Center, Flex, Image, MantineProvider, useMantineColorScheme } from '@mantine/core';

import {mantineTheme} from './theme'

import {
  Container,
  Stack,
  Group,
  Title,
  Text,
  Button,
  useMantineTheme
} from "@mantine/core";


import { IconSun,IconMoon,IconHelp } from '@tabler/icons-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import { useThemeDepends } from './hooks/themeHook';

export type OutletContextType = {
  helpNeeded: {value:boolean,toggle:()=>{}};
};

export function App() {
  const {} = useMantineTheme();
  //to change theme i wil use a mantine hook
  const {colorScheme,toggleColorScheme} = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure(false);

  let navigate = useNavigate();
  
  let location = useLocation();
  useEffect(() => {
    if(location.pathname=='/'){
      navigate('/home')
    }
  }, [location]);


  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <AppShell.Header p={'sm'}>
        <Flex direction={'row'}>

          <Box>
            <Center w={64}>
              <Image src={"/favicon.svg"} alt='logo' w={32} h={32}></Image>
            </Center>
          </Box>

          <Title>Medisim <Text span size='sm'>gr</Text></Title>

          <Group ml={'auto'}>
            <Button variant='outline' onClick={() => { toggleColorScheme() }}>
              {useThemeDepends(<IconSun></IconSun>, <IconMoon></IconMoon>)}
            </Button>
            <Button variant="gradient" radius={'50%'} ml={1} onClick={() => { toggle() }}>
              <IconHelp></IconHelp>
            </Button>
          </Group>
        </Flex>
      </AppShell.Header>


      <AppShell.Main p={0}><Outlet context={{"helpNeeded":{value:opened,toggle}}}></Outlet></AppShell.Main>
    </AppShell>
  );
}
