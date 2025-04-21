import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";
import { router } from "expo-router";

interface SignInProps {
  username?: string;
  password: string;
}

const AuthContext = createContext<{
  signIn: (credentials?: SignInProps | "biometric") => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (credentials?: SignInProps | "biometric") => {
          if (credentials === "biometric") {
            setSession("xxx");
            router.push("/(app)");
            return;
          }

          if (
            credentials?.username === "admin" &&
            credentials?.password === "Admin123"
          ) {
            setSession("xxx");
            router.push("/(app)");
          } else {
            alert("Invalid credentials");
          }
        },
        signOut: () => {
          setSession(null);
          router.replace("/");
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
