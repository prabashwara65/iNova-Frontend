import { useEffect, useState } from "react";
import styled from "styled-components";
import TopNav from "../../components/navigation/TopNav";

const Shell = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  width: min(880px, calc(100% - 40px));
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 28px 0 72px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.08);
  padding: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
`;

const Text = styled.p`
  margin: 10px 0 0;
  line-height: 1.7;
  color: ${({ theme, $error }) => ($error ? "#b42318" : theme.colors.textMuted)};
`;

const Form = styled.form`
  margin-top: 20px;
  display: grid;
  gap: 14px;
`;

const Label = styled.label`
  display: grid;
  gap: 8px;
`;

const LabelText = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.dark};
  }
`;

const ReadOnlyValue = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 12px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`;

const Actions = styled.div`
  margin-top: 8px;
`;

const UpdateButton = styled.button`
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.dark};
  color: #ffffff;
  padding: 12px 16px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("inova_token");

      if (!token) {
        setErrorMessage("Missing auth token. Please login again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rawBody = await response.text();
        let data = null;
        try {
          data = rawBody ? JSON.parse(rawBody) : null;
        } catch {
          data = null;
        }

        if (!response.ok || data?.success === false) {
          throw new Error(data?.message || "Unable to load profile.");
        }

        const profile = data?.data || {};
        setForm({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          status: profile.status || "active",
        });
      } catch (error) {
        setErrorMessage(error.message || "Unable to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("inova_token");

    if (!token) {
      setErrorMessage("Missing auth token. Please login again.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsUpdating(true);

    try {
      const response = await fetch("/api/auth/me", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
        }),
      });

      const rawBody = await response.text();
      let data = null;
      try {
        data = rawBody ? JSON.parse(rawBody) : null;
      } catch {
        data = null;
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Unable to update profile.");
      }

      const updated = data?.data || {};
      setForm((prev) => ({
        ...prev,
        name: updated.name || prev.name,
        email: updated.email || prev.email,
        phone: updated.phone || "",
        status: updated.status || prev.status,
      }));

      const currentStored = localStorage.getItem("inova_user");
      let parsedStored = {};
      try {
        parsedStored = currentStored ? JSON.parse(currentStored) : {};
      } catch {
        parsedStored = {};
      }

      localStorage.setItem(
        "inova_user",
        JSON.stringify({
          ...parsedStored,
          _id: updated._id || parsedStored._id,
          name: updated.name || parsedStored.name,
          email: updated.email || parsedStored.email,
          phone: updated.phone || "",
          status: updated.status || parsedStored.status,
          role: updated.role || parsedStored.role,
        })
      );

      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Shell>
      <TopNav />
      <Section>
        <Container>
          <Card>
            <Title>My Profile</Title>
            <Text>View and update your profile details. Status is controlled by admin only.</Text>

            {isLoading ? <Text>Loading profile...</Text> : null}
            {!isLoading && errorMessage ? <Text $error>{errorMessage}</Text> : null}
            {!isLoading && successMessage ? <Text>{successMessage}</Text> : null}

            {!isLoading ? (
              <Form onSubmit={handleSubmit}>
                <Label>
                  <LabelText>Name</LabelText>
                  <Input
                    type="text"
                    value={form.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    required
                  />
                </Label>

                <Label>
                  <LabelText>Email</LabelText>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    required
                  />
                </Label>

                <Label>
                  <LabelText>Phone Number</LabelText>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                  />
                </Label>

                <Label>
                  <LabelText>Status</LabelText>
                  <ReadOnlyValue>{form.status || "active"}</ReadOnlyValue>
                </Label>

                <Actions>
                  <UpdateButton type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update"}
                  </UpdateButton>
                </Actions>
              </Form>
            ) : null}
          </Card>
        </Container>
      </Section>
    </Shell>
  );
}
