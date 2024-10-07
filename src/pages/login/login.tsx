import LoginForm from "@/features/login/login-form/login-form"
import { Navigate } from "react-router-dom";

const Login = () => {
  const storedCart = localStorage.getItem("cart");
  const storedUser = storedCart ? JSON.parse(storedCart).id : null; // should be in auth context section, but due to limited time this will do.

  if (storedUser) {
    return (
      <Navigate to="/" />
    )
  }

  return (
    <main>
      <LoginForm />
    </main>
  )
}

export default Login