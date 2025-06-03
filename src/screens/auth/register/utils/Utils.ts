import { signup } from "@/actions/auth/LoginActions";
import { RegisterForm, RegisterFormType } from "./RegisterFormValidation";

export async function handleSubmit(values: RegisterFormType) {
    // First validate the values
    const result = RegisterForm.safeParse(values);
  
    if (!result.success) {
      // Handle errors, e.g. show on UI
      console.error(result.error.flatten().fieldErrors);
      return;
    }
  
    const validData = result.data;
  
    // Convert to FormData
    const formData = new FormData();
    formData.append("email", validData.email);
    formData.append("password", validData.password);
  
    // Call the signup action
    try {
      await signup(formData);
    } catch (err) {
      console.error("Signup failed:", err);
      // Optionally handle specific error state here
    }
  }
  