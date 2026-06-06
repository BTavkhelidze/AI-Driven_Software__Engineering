import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Children, createContext, useContext, useState } from 'react';
import { fetchCurrentUser, loginUser, logoutUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = new QueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const login = async (credential) => {
    await loginUser(credential);
    await queryClient.invalidateQueries(['auth', 'me']);
  };
  const logout = async () => {
    await logout();
    queryClient.setQueriesData(['auth', 'me'], null);
    queryClient.removeQueries(['auth', 'me']);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading: isLoading,
        isAuthError: isError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth must ve used within provider');

  return ctx;
};