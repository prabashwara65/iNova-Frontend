import AuthForm from "../../components/auth/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Form fields configuration
const signupFields = [
  {
    label: "First name",
    name: "firstName",
    type: "text",
    placeholder: "John",
    autoComplete: "given-name",
    required: true,
  },
  {
    label: "Last name",
    name: "lastName",
    type: "text",
    placeholder: "Doe",
    autoComplete: "family-name",
    required: true,
  },
  {
    label: "Email address",
    name: "email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    required: true,
  },
  {
    label: "Phone number",
    name: "phone",
    type: "tel",
    placeholder: "+94 77 123 4567",
    autoComplete: "tel",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Create a password",
    autoComplete: "new-password",
    required: true,
  },
  {
    label: "Confirm password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Repeat your password",
    autoComplete: "new-password",
    required: true,
  },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const firstName = payload.firstName?.trim();
    const lastName = payload.lastName?.trim();
    const email = payload.email?.trim();
    const phone = payload.phone?.trim();
    const password = payload.password;
    const confirmPassword = payload.confirmPassword;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
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
        throw new Error(
          data?.message ||
            (rawBody && rawBody.trim()) ||
            "Registration failed. Server returned an invalid response."
        );
      }

      if (data?.token) {
        localStorage.setItem("inova_token", data.token);
      }
      if (data?.user) {
        localStorage.setItem("inova_user", JSON.stringify(data.user));
      }

      form.reset();
      setSuccessMessage("Registration successful. You can now log in.");
      navigate(data?.user?.role === "admin" ? "/admin" : "/");
    } catch (error) {
      const isNetworkFailure =
        error instanceof TypeError &&
        (error.message === "Failed to fetch" || error.message === "NetworkError when attempting to fetch resource.");

      if (isNetworkFailure) {
        setErrorMessage(
          "Cannot reach User Service. Make sure backend is running on port 3003, then restart frontend dev server."
        );
      } else {
        setErrorMessage(error.message || "Unable to register user right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      mode="signup"
      title="Create your account and unlock a smarter, more seamless way to shop."
      description="Join now to manage your shopping, track deliveries, and make the most of a smooth online experience."
    >
      <AuthForm
        mode="signup"
        heading="Create account"
        intro="Fill in your details to start saving products, checking out faster, and managing your profile."
        fields={signupFields}
        submitLabel={isSubmitting ? "Signing up..." : "Sign Up"}
        switchText="Already have an account?"
        switchLinkLabel="Login instead"
        switchTo="/login"
        onSubmit={handleSubmit}
        submitDisabled={isSubmitting}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </AuthLayout>
  );
}
