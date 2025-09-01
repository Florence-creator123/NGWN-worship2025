import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const AuthContext = createContext({ user: null });

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  async function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function signOutUser() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, initializing, signIn, signUp, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}