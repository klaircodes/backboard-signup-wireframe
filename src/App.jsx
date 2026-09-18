import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './screens/SignUp.jsx'
import SignIn from './screens/SignIn.jsx'
import Start from './screens/Start.jsx'
import Dashboard from './screens/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/start/:path" element={<Start />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
}
