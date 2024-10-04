import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminHome from './pages/admin/AdminHome'
import StudentHome from './pages/student/StudentHome'
import AdminStudentHome from './pages/admin/AdminStudentHome'
import StudentProfile from './pages/student/StudentProfile'
import AdminProfile from './pages/admin/AdminProfile'
import AdminStudentFee from './pages/admin/AdminStudentFee'
import StudentFees from './pages/student/StudentFees'
import AdminAcademics from './pages/admin/AdminAcademics'
import StudentAcademics from './pages/student/StudentAcademics'
import AdminStudentResults from './pages/admin/AdminStudentResults'
import StudentResults from './pages/student/components/StudentResults'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Home/>}></Route>
      <Route path={"/login"} element={<Login/>}></Route>
      <Route path='/student'>
        <Route path={"home/:branch/:id"} element={<StudentHome/>}></Route>
        <Route path={"studentProfile/:branch/:id"} element={<StudentProfile/>}></Route>
        <Route path={"fees/:branch/:id"} element={<StudentFees/>}></Route>
        <Route path={"academics/:branch/:studentId"} element={<StudentAcademics/>}></Route>
        <Route path={"results/:branch/:studentId"} element={<StudentResults/>}></Route>
      </Route>
      <Route path='/admin'>
        <Route path={"home/:id"} element={<AdminHome/>}></Route>
        <Route path={"profile/:adminId"} element={<AdminProfile/>}></Route>
        <Route path={"academics/:adminId"} element={<AdminAcademics/>}></Route>
        <Route path={"home/:adminId/:branch/:studentId"} element={<AdminStudentHome/>}></Route>
        <Route path={"fees/:adminId/:branch/:studentId"} element={<AdminStudentFee/>}></Route>
        <Route path={"results/:adminId/:branch/:studentId"} element={<AdminStudentResults/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
