import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import DashboardLayout from './layouts/DashboardLayout'
import { FluentProvider, webDarkTheme, webLightTheme,  } from '@fluentui/react-components'
import ExportData from './pages/ExportData'
import ImportData from './pages/ImportData'

function App() {
  
  return (
    <BrowserRouter>
    <FluentProvider theme={webDarkTheme}>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/dashboard' element={<DashboardLayout> <Dashboard/> </DashboardLayout>}/>
        <Route path='/dashboard/export' element={<DashboardLayout> <ExportData /> </DashboardLayout>}/>
        <Route path='/dashboard/import' element={<DashboardLayout> <ImportData /> </DashboardLayout>}/>
      </Routes>
      </FluentProvider>
    </BrowserRouter>
  )
}

export default App
