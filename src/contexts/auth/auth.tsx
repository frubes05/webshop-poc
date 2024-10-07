import { useToast } from "@/hooks/use-toast";
import { AuthProps } from "@/types/auth/auth";
import { fetcher } from "@/utils/fetcher";
import { createContext, PropsWithChildren, useState } from "react";
import useSWRImmutable from "swr/immutable";

interface UserInterface {
  username: string;
  password: string;
}

export interface AuthContextProps {
  credentials: AuthProps | null;
  handleLogin: (data: UserInterface) => void;
  handleLogout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  credentials: null,
  handleLogin: () => {},
  handleLogout: () => {},
  error: null,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [credentials, setCredentials] = useState<null | AuthProps>(null);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useSWRImmutable<AuthProps>(
    user ? [user.username, user.password] : null,
    () =>
      fetcher("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user?.username,
          password: user?.password,
          expiresInMins: 15,
        }),
      })
        .then((response) => {
          if (response.message) {
            throw new Error(response.message);
          }
          return response;
        })
        .catch((error) => {
          setError(error.message);
          throw error;
        }),
    {
      onSuccess: (data) => {
        setCredentials(data);
        setError(null);
        toast({
          title: "Successfully logged in!",
          variant: "default",
          duration: 3000,
        });
      },
      onError: (err) => {
        setError(err.message);
        setCredentials(null);
        toast({
          title: "An Error occured!",
          description: error,
          variant: "destructive",
        });
      },
    }
  );

  const handleLogin = (data: UserInterface) => setUser(data);

  const handleLogout = () => {
    setUser(null);
    setCredentials(null);
    localStorage.removeItem("cart");
  }

  const value = {
    credentials,
    handleLogin,
    handleLogout,
    error,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
