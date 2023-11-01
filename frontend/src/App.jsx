import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import DashboardLayout from './layouts/DashboardLayout'
import ExportData from './pages/ExportData'
import ImportData from './pages/ImportData'

function App() {
  return (
    <div className='screen-container'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/dashboard' element={<DashboardLayout> <Dashboard/> </DashboardLayout>}/>
        <Route path='/dashboard/export' element={<DashboardLayout> <ExportData /> </DashboardLayout>}/>
        <Route path='/dashboard/import' element={<DashboardLayout> <ImportData /> </DashboardLayout>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
