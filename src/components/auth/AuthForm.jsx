import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  width: min(450px, 100%);
  margin: 0 auto;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Intro = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const Form = styled.form`
  margin-top: 28px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: block;
  margin-bottom: 14px;
`;

const FieldLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  font-size: 0.92rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 13px 14px;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.dark};
    box-shadow: 0 0 0 4px rgba(34, 34, 34, 0.08);
    transform: translateY(-1px);
  }
`;

const HelperRow = styled.div`
  margin: 4px 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const CheckLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.accent};
`;

const TextLink = styled(Link)`
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Submit = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 14px 18px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 180ms ease, opacity 180ms ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const FooterText = styled.p`
  margin: 20px 0 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const InlineLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
`;

const FormMessage = styled.p`
  margin: 0 0 14px;
  font-size: 0.92rem;
  color: ${({ theme, $type }) =>
    $type === "error" ? "#b42318" : theme.colors.success};
`;

export default function AuthForm({
  mode,
  heading,
  intro,
  fields,
  submitLabel,
  switchText,
  switchLinkLabel,
  switchTo,
  onSubmit,
  submitDisabled = false,
  errorMessage = "",
  successMessage = "",
}) {
  return (
    <Card>
      <Heading>{heading}</Heading>
      <Intro>{intro}</Intro>

      <Form onSubmit={onSubmit}>
        {mode === "signup" ? (
          <Grid>
            {fields.slice(0, 2).map((field) => (
              <Field key={field.name}>
                <FieldLabel>{field.label}</FieldLabel>
                <Input {...field} />
              </Field>
            ))}
          </Grid>
        ) : null}

        {fields.slice(mode === "signup" ? 2 : 0).map((field) => (
          <Field key={field.name}>
            <FieldLabel>{field.label}</FieldLabel>
            <Input {...field} />
          </Field>
        ))}

        <HelperRow>
          <CheckLabel>
            <Checkbox type="checkbox" defaultChecked={mode === "login"} />
            {mode === "login" ? "Keep me signed in" : "I agree to the terms and privacy policy"}
          </CheckLabel>
          {mode === "login" ? <TextLink to="/signup">Need an account?</TextLink> : null}
        </HelperRow>

        {errorMessage ? <FormMessage $type="error">{errorMessage}</FormMessage> : null}
        {successMessage ? <FormMessage>{successMessage}</FormMessage> : null}
        <Submit type="submit" disabled={submitDisabled}>
          {submitLabel}
        </Submit>
      </Form>

      <FooterText>
        {switchText} <InlineLink to={switchTo}>{switchLinkLabel}</InlineLink>
      </FooterText>
    </Card>
  );
}
