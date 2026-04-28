import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

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
  Image,
  Card,
  Anchor,
  SimpleGrid,
  ThemeIcon,
} from "@mantine/core";


import { IconSun,IconMoon } from '@tabler/icons-react';


function App() {
  const [count,setCount] = useState(0)
  //to change theme i wil use a mantine hook
  const {colorScheme,toggleColorScheme} = useMantineColorScheme()

  return (
      <Container p={"lg"}>
        <Stack>
          <Title>Welcome to Medisim</Title>
          <Text>You will soon load a scenario</Text>
          <Button onClick={()=>{toggleColorScheme()}}>{colorScheme=='dark'?<IconMoon></IconMoon>:<IconSun></IconSun>}</Button>

          <Button>I am ready</Button>
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
