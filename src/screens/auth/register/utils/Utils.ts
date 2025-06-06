import { signup } from "@/actions/auth/BasicAuthActions";
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
    console.log("Utils Valid data:", validData);
  
    // Convert to FormData
    const formData = new FormData();
    formData.append("email", validData.email);
    formData.append("password", validData.password);
    formData.append("role", validData.role);
  
    // Call the signup action
    try {
      await signup(formData);
    } catch (err) {
      console.error("Signup failed:", err);
      // Optionally handle specific error state here
    }
  }
  