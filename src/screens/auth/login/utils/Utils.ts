import { login } from "@/actions/auth/BasicAuthActions";
import { LoginSchema, LoginSchemaType } from "./LoginFormValidation";

export async function handleLoginSubmit(values: LoginSchemaType, role: string) {
  // First validate the input
  const result = LoginSchema.safeParse(values);

  if (!result.success) {
    console.error(result.error.flatten().fieldErrors);
    // You can return the errors to show in the UI
    return;
  }

  const validData = result.data;

  // Convert to FormData
  const formData = new FormData();
  formData.append("email", validData.email);
  formData.append("password", validData.password);

  // Call the login action
  try {
    const response = await login(formData, role);

    if(response?.error) {
      return({error: response.error});
    }

  } catch (err) {
    console.error("Login failed:", err);
    // Optionally handle specific error state here
  }
}
