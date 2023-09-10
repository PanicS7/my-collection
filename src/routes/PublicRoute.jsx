import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

export const PublicRoute = ({ children }) => {
  const user = useAuth()
  console.log(user)

  if(user.user) {
    return <Navigate to="/" replace={true} />
  }

  return children
}