// ProtectedRoute.jsx
import { Navigate, useParams } from "react-router-dom"

const ProtectedRoute = ({ children, user }) => {
  const { partnerId } = useParams()

  // Not logged in
  if (!user) {
    return
//      <Navigate to="/login" />
  }

  // Not a partner
  if (user.role !== "partner") {
    return <Navigate to="/" />
  }

  // Optional: ownership check (frontend level)
  if (user.id !== partnerId) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute