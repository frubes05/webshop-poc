import { AuthContext, AuthContextProps } from "@/contexts/auth/auth";
import { useContext } from "react";

export const useAuthContext: () => AuthContextProps= () => {
    return useContext(AuthContext);
  };