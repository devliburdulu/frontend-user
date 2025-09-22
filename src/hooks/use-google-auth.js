// useGoogleLogin.js - Custom hook for Google login functionality
import { useState, useEffect } from "react";
import { useAuthContext } from "src/auth/hooks";

export function useGoogleLogin() {
  const { loginWithGoogle } = useAuthContext();
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Reset loading state when page becomes visible again
      if (document.visibilityState === "visible") {
        setIsGoogleSubmitting(false);
      }
    };

    const handlePopState = () => {
      setIsGoogleSubmitting(false);
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleSubmitting(true);
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "Login failed");
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return {
    isGoogleSubmitting,
    errorMsg,
    handleGoogleLogin,
    setErrorMsg, // Exposing this to allow the parent component to reset errors
  };
}
