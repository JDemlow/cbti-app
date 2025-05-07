// src/hooks/useAuth.tsx

"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api, API_BASE_URL } from "@/lib/api";
import {
  setAuthToken,
  clearAuthToken,
  isAuthenticated,
  setUserData as storeUserData,
  getUserData as getStoredUserData,
  UserData,
} from "@/lib/auth";

// Types for authentication state
interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}

// Types for auth context data
interface AuthContextData extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserData: (userData: Partial<UserData>) => Promise<UserData>;
}

// Types for registration data
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  timeZone?: string;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Hook to use the auth context
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider component for the auth context
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isAuthenticated()) {
          const userData = getStoredUserData();
          setAuthState({
            user: userData,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch {
        setAuthState({
          user: null,
          isLoading: false,
          error: "Failed to initialize authentication",
        });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Define the response type inline
        interface LoginResponse {
          access_token: string;
          token_type: string;
          user: UserData;
        }

        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Login failed");
        }

        const data: LoginResponse = await response.json();

        setAuthToken(data.access_token);
        storeUserData(data.user);

        setAuthState({
          user: data.user,
          isLoading: false,
          error: null,
        });

        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: error instanceof Error ? error.message : "Login failed",
        });
      }
    },
    [router]
  );

  // Register function
  const register = useCallback(
    async (userData: RegisterData) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Convert RegisterData to Record<string, unknown> to satisfy TypeScript
        const userDataRecord: Record<string, unknown> = {
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
        };

        // Add optional fields if they exist
        if (userData.phoneNumber)
          userDataRecord.phoneNumber = userData.phoneNumber;
        if (userData.timeZone) userDataRecord.timeZone = userData.timeZone;

        await api.post<{ message: string }>("/auth/register", userDataRecord, {
          requireAuth: false,
        });

        // After registration, log in the user
        await login(userData.email, userData.password);
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Registration failed",
        }));
      }
    },
    [login]
  );

  // Logout function
  const logout = useCallback(() => {
    clearAuthToken();
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });

    // Redirect to login page
    router.push("/login");
  }, [router]);

  // Update user data
  const updateUserData = useCallback(
    async (userData: Partial<UserData>) => {
      if (!authState.user) {
        throw new Error("User not authenticated");
      }

      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Normalize field names to match backend expectations
        const userDataRecord: Record<string, unknown> = {};
        Object.entries(userData).forEach(([key, value]) => {
          // Camel case to snake case conversion
          const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
          userDataRecord[snakeKey] = value;
        });

        const updatedUser = await api.put<UserData>(
          `/users/${authState.user.id}`,
          userDataRecord
        );

        storeUserData(updatedUser);

        setAuthState({
          user: updatedUser,
          isLoading: false,
          error: null,
        });

        return updatedUser;
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to update user data",
        }));
        throw error;
      }
    },
    [authState.user]
  );

  // Context value
  const value = {
    ...authState,
    login,
    register,
    logout,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
