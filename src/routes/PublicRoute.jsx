import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
import PropTypes from 'prop-types';

const PublicRoute = ({children}) => {
  const user = useAuth()

  if(user.user) {
    return <Navigate to="/" replace={true} />
  }

  return children
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PublicRoute }
