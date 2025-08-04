import { Toaster } from "react-hot-toast"
import { LoginForm } from "./components/LoginForm"
import { Dashboard } from "./components/Dashboard"
import { useAuth } from "./hooks/useAuth"

function App() {
  const { user, logout } = useAuth()

  return (
    <>
      {user ? (
        <Dashboard user={user} onLogout={logout} />
      ) : (
        <LoginForm />
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            duration: 4000,
            style: {
              background: 'rgba(16, 185, 129, 0.95)',
              color: '#fff',
              border: '1px solid #10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'rgba(239, 68, 68, 0.95)',
              color: '#fff',
              border: '1px solid #ef4444',
            },
          },
        }}
      />
    </>
  )
}

export default App
