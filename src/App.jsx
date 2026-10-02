import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './screens/Landing.jsx'
import SignIn from './screens/SignIn.jsx'
import SignUp from './screens/SignUp.jsx'
import Start from './screens/Start.jsx'
import Dashboard from './screens/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/start/:path" element={<Start />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
