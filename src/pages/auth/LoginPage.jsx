import AuthForm from "../../components/auth/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log("Login form submitted:", payload);
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
        submitLabel="Login to Account"
        switchText="New here?"
        switchLinkLabel="Create an account"
        switchTo="/signup"
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}
