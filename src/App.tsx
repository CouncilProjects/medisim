import { useState } from 'react'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider, useMantineColorScheme } from '@mantine/core';

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


import { IconSun,IconMoon } from '@tabler/icons-react';
import { NavLink } from 'react-router';


export function App() {
  const [count,setCount] = useState(0)
  const theme = useMantineTheme();
  //to change theme i wil use a mantine hook
  const {colorScheme,toggleColorScheme} = useMantineColorScheme()

  return (
      <Container p={"lg"}>
        <Stack>
          <Title>Welcome to Medisim</Title>
          <Text>You will soon load a scenario</Text>
          <Button onClick={()=>{toggleColorScheme()}}>{colorScheme=='dark'?<IconMoon></IconMoon>:<IconSun></IconSun>}</Button>

        <NavLink to="course" end>
          <Button>Show me the basics</Button>
        </NavLink>
          
          <Group>
            <Button bg={'red'}>Report</Button>
            <Button bg={'pink'}>Donate</Button>
            <Button bg={'grape'}>Leave review</Button>
          </Group>
        </Stack>
      </Container>
  );
}

function ThemeRoot() {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme='dark'>
      <App></App>
    </MantineProvider>
  )
}

export default ThemeRoot
