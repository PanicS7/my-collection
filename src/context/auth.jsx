import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase/config";
import PropTypes from 'prop-types';

// create context
export const AuthContext = createContext({
  user:null,
  isLoading:false,
})

// create provider
const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsLoading(false)
    }) 

    return unsubscribe
  }, [])

  const value = {
    user,
    isLoading,
  }

  return (
    <AuthContext.Provider value={value}>
      { !isLoading && children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider }