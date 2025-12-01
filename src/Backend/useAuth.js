import { useState } from "react";
import { loginUser, registerUser } from "./authService.js";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email, password) {
    setLoading(true);
    setError("");

    try {
      await loginUser(email, password);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password, extraData) {
    setLoading(true);
    setError("");

    try {
      await registerUser(email, password, extraData);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    register,
    loading,
    error
  };
}
