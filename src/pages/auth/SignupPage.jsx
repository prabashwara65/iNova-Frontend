import AuthForm from "../../components/auth/AuthForm";
import AuthLayout from "../../components/auth/AuthLayout";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log("Signup form submitted:", payload);
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
        submitLabel="Sign Up"
        switchText="Already have an account?"
        switchLinkLabel="Login instead"
        switchTo="/login"
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}
