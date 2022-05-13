/* eslint-disable no-console */
import { createContext, ReactNode, useEffect, useState } from 'react';

import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { api } from '../services/apiClient';

type User = {
  email: string;
  isAdmin: boolean;
  isAdvisor: boolean;
  fullName: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credential: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User | undefined;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.reload();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          authChannel.close();
          window.location.replace('http://localhost:3000/');
          break;
        case 'signIn':
          window.location.replace('http://localhost:3000/');
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/users/profile')
        .then((response) => {
          const { email, isAdmin, isAdvisor, fullName } = response.data;
          setUser({ email, isAdmin, isAdvisor, fullName });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, refresh_token, user } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.refreshToken', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({
        email,
        isAdmin: user.isAdmin,
        isAdvisor: user.isAdvisor,
        fullName: user.name,
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      authChannel.postMessage('signIn');
      Router.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
