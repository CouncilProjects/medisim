import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from './App.tsx'
import Course1 from './crashcourse/basics1.tsx';
import Selectcourse from './crashcourse/courseSelection.tsx';
import { MantineProvider } from '@mantine/core';
import { mantineTheme } from './theme.ts';
import ColorCourse from './crashcourse/basics2.tsx';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
import Home from './home/home.tsx';
import TestImage from './test.tsx';

createRoot(document.getElementById('root')!).render(
<StrictMode>
            <MantineProvider theme={mantineTheme} defaultColorScheme='dark'>
              <Notifications></Notifications>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<App></App>}>
                    <Route index path='home' element={<Home></Home>}></Route>
                    <Route index path='test' element={<TestImage></TestImage>}></Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </MantineProvider>
          </StrictMode>,
)
