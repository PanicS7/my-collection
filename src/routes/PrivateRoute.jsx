import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {
  const user = useAuth()

  if(!(user.user)) {
    return <Navigate to="/signup" replace={true} />
  }

  return children
}
