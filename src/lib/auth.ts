// src/lib/auth.ts

/**
 * Auth token management with localStorage
 * Note: This uses browser storage, so it will only work client-side
 */

// Basic user data interface
export interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  weekInProgram: number;
  bedtime?: string;
  wakeTime?: string;
  insomniaDuration?: string;
  sleepIssues?: string[];
  sleepGoals?: string[];
  [key: string]: unknown;
}

// JWT token payload interface
interface JwtPayload {
  sub: string; // subject (user id)
  exp: number; // expiration time
  iat: number; // issued at time
  [key: string]: unknown;
}

const AUTH_TOKEN_KEY = "cbt_app_auth_token";
const USER_DATA_KEY = "cbt_app_user";

// Store the JWT token
export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

// Retrieve the JWT token
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}

// Clear the JWT token (for logout)
export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Store user data
export function setUserData(userData: UserData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
}

// Get user data
export function getUserData(): UserData | null {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
      try {
        return JSON.parse(userData) as UserData;
      } catch (error) {
        console.error("Failed to parse user data", error);
        return null;
      }
    }
  }
  return null;
}

// Parse the JWT token (without validation)
export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch (error) {
    console.error("Failed to parse JWT token", error);
    return null;
  }
}

// Check if token is expired
export function isTokenExpired(): boolean {
  const token = getAuthToken();
  if (!token) return true;

  const decodedToken = parseJwt(token);
  if (!decodedToken) return true;

  // Check the expiration claim (exp)
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

// Logout function - clears token and any auth state
export function logout(): void {
  clearAuthToken();
  // Additional cleanup can be added here
}
