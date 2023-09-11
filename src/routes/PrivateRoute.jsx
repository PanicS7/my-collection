import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
  const user = useAuth()

  if(!(user.user)) {
    return <Navigate to="/signup" replace={true} />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PrivateRoute }