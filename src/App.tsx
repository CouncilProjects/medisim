import { useEffect } from 'react'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { AppShell, Box, Center, Flex, Image, useMantineColorScheme } from '@mantine/core';

import {
  Group,
  Title,
  Text,
  Button,
} from "@mantine/core";


import { IconSun,IconMoon,IconHelp,IconArrowBack } from '@tabler/icons-react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import { useThemeDepends } from './hooks/themeHook';

export type OutletContextType = {
  helpNeeded: {value:boolean,toggle:()=>void};
};

export function App() {
  //to change theme i wil use a mantine hook
  const {colorScheme,toggleColorScheme} = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure(false);
  const loc = useLocation();

  const navigate = useNavigate();
  
  const location = useLocation();
  useEffect(() => {
    if(location.pathname=='/'){
      navigate('/home')
    }
  }, [location,navigate]);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <AppShell.Header p={'sm'} mb={5}>
        <Flex direction={'row'}>

          <Box>
            <Center w={64}>
              <Image src={"/favicon.png"} alt='logo' w={32} h={32}></Image>
            </Center>
          </Box>

          <Title>Medisim <Text span size='sm'>gr</Text></Title>
          

          <Group ml={'auto'}>
            {!loc.pathname.includes("/home") &&
              <Button variant='light' onClick={()=>navigate(-1)}>
                  <IconArrowBack></IconArrowBack>
              </Button>
            }

            
            <Button variant='outline' onClick={() => { toggleColorScheme() }}>
              {useThemeDepends(<IconSun></IconSun>, <IconMoon></IconMoon>)}
            </Button>
            <Button variant="gradient" radius={'50%'} ml={1} onClick={() => { toggle() }}>
              <IconHelp></IconHelp>
            </Button>
          </Group>
        </Flex>
      </AppShell.Header>


      <AppShell.Main px={0} pt={60}><Outlet context={{"helpNeeded":{value:opened,toggle}}}></Outlet></AppShell.Main>
    </AppShell>
  );
}
