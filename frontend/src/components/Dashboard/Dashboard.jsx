import { useEffect, useState } from "react"
import { auth, signOut } from "./firebase"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        navigate("/auth")
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/auth")
  }

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {user ? (
        <>
          <p>Hello, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Dashboard
