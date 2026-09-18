import { Routes, Route, Navigate } from 'react-router-dom'
import Pick from './screens/Pick.jsx'
import Account from './screens/Account.jsx'
import Start from './screens/Start.jsx'
import SignIn from './screens/SignIn.jsx'
import Dashboard from './screens/Dashboard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<Pick />} />
      <Route path="/signup/account" element={<Account />} />
      <Route path="/start/:path" element={<Start />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
}
