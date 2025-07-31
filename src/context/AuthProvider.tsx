import { createContext, useState, type ReactNode } from "react";

export interface AuthContextType {
  auth: {
    user?: any;
    accessToken?: string;
    refreshToken?: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      user?: any;
      accessToken?: string;
      refreshToken?: string;
    }>
  >;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{ user?: any }>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
