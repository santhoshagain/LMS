import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

// Utility to check user authentication and role
export const isAuthenticated = (requiredRole) => {
  const token = Cookies.get("authToken");
  if (!token) {
    return false; // No token means the user is not authenticated
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    const { role, exp } = decodedToken;

    // Check if the token has expired
    if (exp && Date.now() >= exp * 1000) {
      return false; // Token expired
    }

    // Check if the user has the required role
    return role === requiredRole;
  } catch (error) {
    console.error("Invalid token:", error);
    return false; // Invalid token
  }
};
