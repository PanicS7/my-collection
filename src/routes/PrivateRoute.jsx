import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {
  const user = useAuth()
  console.log(user)

  if(!(user.user)) {
    return <Navigate to="/signup" replace={true} />
  }

  return children
}
