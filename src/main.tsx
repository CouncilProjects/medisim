import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from './App.tsx'

import { MantineProvider } from '@mantine/core';
import { mantineTheme } from './theme.ts';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
import Home from './home/home.tsx';
import TestImage from './test.tsx';
import { ScenarioHome } from './scenarioHome/scenarioHome.tsx';
import VitalScreen from './scenarioHome/vitalScreen/vitalScreen.tsx';
import InfoScreen from './scenarioHome/infoScreen/infoScreen.tsx';
import VentilationScreen from './scenarioHome/ventilationScreen/ventiScreen.tsx';
import CabinetScreen from './scenarioHome/cabinetScreen/cabinetScreen.tsx';
import { OverlayImageMenu } from './scenarioHome/overlayImage.tsx';
import { EndScreen } from './scenarioHome/endScreen/EndScreen.tsx';

createRoot(document.getElementById('root')!).render(
            <StrictMode>
            <MantineProvider theme={mantineTheme} defaultColorScheme='dark'>
              <Notifications></Notifications>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<App></App>}>
                    <Route index path='home' element={<Home></Home>}></Route>
                    <Route index path='test' element={<TestImage></TestImage>}></Route>
                    <Route path="/scenario/:scenarioId" element={<ScenarioHome />}>
                      <Route index element={<OverlayImageMenu></OverlayImageMenu>}></Route>
                      <Route path='vitals' element={<VitalScreen></VitalScreen>}></Route>
                      <Route path='info' element={<InfoScreen></InfoScreen>}></Route>
                      <Route path='ventilation' element={<VentilationScreen></VentilationScreen>}></Route>
                      <Route path='cabinet' element={<CabinetScreen></CabinetScreen>}></Route>
                    </Route>
                    <Route path='report' element={<EndScreen></EndScreen>}></Route>
                  </Route>
                  
                </Routes>
              </BrowserRouter>
            </MantineProvider>
            </StrictMode>
          ,
)
