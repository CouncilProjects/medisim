import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import ThemeRoot, { App } from './App.tsx'
import Course1 from './crashcourse/basics1.tsx';
import Selectcourse from './crashcourse/courseSelection.tsx';
import { MantineProvider } from '@mantine/core';
import { mantineTheme } from './theme.ts';
import ColorCourse from './crashcourse/basics2.tsx';

createRoot(document.getElementById('root')!).render(
<StrictMode>
            <MantineProvider theme={mantineTheme} defaultColorScheme='dark'>
            <BrowserRouter>
              <Routes>
                <Route index path='/' element={<App></App>}></Route>
                <Route path='course' element={<Selectcourse></Selectcourse>}>
                </Route>
              <Route path='course/layout' element={<Course1 />} />
              <Route path='course/color' element={<ColorCourse></ColorCourse>}/>
              <Route path='course/theme' />
              </Routes>
            </BrowserRouter>
    </MantineProvider>
          </StrictMode>,
)
