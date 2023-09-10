import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase/config";

// create context
export const AuthContext = createContext({
  user:null,
  isLoading:false,
})

// create provider
export const AuthProvider = ({ children }) => {

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