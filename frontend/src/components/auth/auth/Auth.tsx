import { createContext, PropsWithChildren, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import "./Auth.css";
import User from "../../../models/user/User";

interface AuthContextInterface {
  jwt: string;
  user: User | null;
  isLoading: boolean;
  newLogin(jwt: string): void;
  logOut(): void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function Auth(props: PropsWithChildren): JSX.Element {
  const JWT_KEY_NAME = "jwt";
  const { children } = props;

  const [jwt, setJwt] = useState<string>(
    localStorage.getItem(JWT_KEY_NAME) || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useMemo(() => {
    if (!jwt) return null;
    try {
      return jwtDecode<User>(jwt);
    } catch (error) {
      console.error("Token is not valid:", error);

      localStorage.removeItem(JWT_KEY_NAME);
      return null;
    }
  }, [jwt]);

  function newLogin(newJwt: string) {
    setIsLoading(true);
    localStorage.setItem(JWT_KEY_NAME, newJwt);
    setJwt(newJwt);
    setIsLoading(false);
  }

  function logOut() {
    setIsLoading(true);
    localStorage.removeItem(JWT_KEY_NAME);
    setJwt("");
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        jwt,
        user,
        isLoading,
        newLogin,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
