import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './screens/Landing.jsx'
import SignUp from './screens/SignUp.jsx'
import Start from './screens/Start.jsx'
import SignIn from './screens/SignIn.jsx'
import Dashboard from './screens/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<Landing />} />
      <Route path="/signup/account" element={<SignUp />} />
      <Route path="/start/:path" element={<Start />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
}
