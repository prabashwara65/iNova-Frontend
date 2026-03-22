import AuthForm from "../../components/auth/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginFields = [
  {
    label: "Email address",
    name: "email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    required: true,
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setErrorMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const email = payload.email?.trim();
    const password = payload.password;

    if (!email || !password) {
      setErrorMessage("Please provide email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const rawBody = await response.text();
      let data = null;

      try {
        data = rawBody ? JSON.parse(rawBody) : null;
      } catch {
        data = null;
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Invalid credentials. Please try again.");
      }

      if (data?.token) {
        localStorage.setItem("inova_token", data.token);
      }
      if (data?.user) {
        localStorage.setItem("inova_user", JSON.stringify(data.user));
      }

      form.reset();
      navigate(data?.user?.role === "admin" ? "/admin" : "/");
    } catch (error) {
      const isNetworkFailure =
        error instanceof TypeError &&
        (error.message === "Failed to fetch" || error.message === "NetworkError when attempting to fetch resource.");

      if (isNetworkFailure) {
        setErrorMessage("Cannot reach User Service. Make sure backend is running on port 3003.");
      } else {
        setErrorMessage(error.message || "Unable to login right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      mode="login"
      title="Welcome back! Let’s continue your shopping journey."
      description="Access your account to track orders, manage purchases, and enjoy a smooth shopping experience"
    >
      <AuthForm
        mode="login"
        heading="Sign in"
        intro="Enter your email and password to access your account."
        fields={loginFields}
        submitLabel={isSubmitting ? "Logging in..." : "Login to Account"}
        switchText="New here?"
        switchLinkLabel="Create an account"
        switchTo="/signup"
        onSubmit={handleSubmit}
        submitDisabled={isSubmitting}
        errorMessage={errorMessage}
      />
    </AuthLayout>
  );
}
