import { useState } from "react";
import { TextField, PrimaryButton, Stack, Label, Checkbox } from "@fluentui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
 // Import the useAuth hook to access login function
import { useAuth } from "./AuthContext";
import { saveUserProfile } from "./Api";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const { login } = useAuth(); // Get login function from context

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make API call to authenticate user
        const response = await saveUserProfile(values);
        console.log("response", response);
        // On success, log the user in and store token in context
        if (response.token) {
          localStorage.setItem("name",response.name);
          login(response, response.token); // Set user and token in context
          alert("Login successful!");
          // Redirect user to the protected page (e.g. Dashboard)
          window.location.href = "/dashboard"; // Or use your router to navigate
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Login error", error);
        alert("An error occurred during login");
      }
    },
  });

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", paddingTop: 50 }}>
      <Stack tokens={{ childrenGap: 20 }}>
        <Label style={{ fontSize: 24, textAlign: "center" }}>Login</Label>

        <form onSubmit={formik.handleSubmit}>
          {/* Username Input */}
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.username && formik.errors.username as any}
            styles={{ root: { width: "100%" } }}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.password && formik.errors.password as any}
            styles={{ root: { width: "100%" } }}
          />

          {/* Remember Me Checkbox */}
          <Checkbox
            label="Remember me"
            checked={isRememberMeChecked}
            styles={{ root: { padding: 10 } }}
            onChange={(e, checked) => setIsRememberMeChecked(checked || false)}
          />

          {/* Submit Button */}
          <PrimaryButton
            text="Login"
            type="submit"
            styles={{ root: { width: "100%" } }}
          />
        </form>
      </Stack>
    </div>
  );
};

export default Login;


