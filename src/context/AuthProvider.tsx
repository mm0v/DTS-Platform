import { createContext, useState, type ReactNode } from "react";

export interface AuthContextType {
  auth: {
    user?: any;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    isVerified?: boolean;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      user?: any;
      role?: string;
      accessToken?: string;
      refreshToken?: string;
      isVerified?: boolean;
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
