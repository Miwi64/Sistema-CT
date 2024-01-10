import { ThemeProvider } from "./components/themeprovider"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./screens/login"
import StudentsTable from "./screens/students-table"
import NotFound from "./screens/not-found"

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/students-table" element={<StudentsTable />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
