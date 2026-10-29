import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod valitdation Schema
const signupSchema = z
  .object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters.").max(30, "First name cannot exceed 30 characters."),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters.").max(30, "Last name cannot exceed 30 characters."),
    email: z.string().trim().min(1, "Email is required.").email("Please enter a valid email address."),
    password: z.string().min(8, "At least 8 character"),
    confirmPassword: z.string().min(1, "Please confirm password."),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

type FieldProps = {
  control: Control<SignupFormData>;
  name: FieldPath<SignupFormData>;
  label: string;
  placeholder: string;
  secure?: boolean;
  email?: boolean;
};

function Field({ control, name, label, placeholder, secure, email }: FieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secure}
            keyboardType={email ? "email-address" : "default"}
            autoCapitalize={email || secure ? "none" : "sentences"}
            autoCorrect={!(email || secure)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            accessibilityLabel={label}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  );
}

export default function SignUpScreen() {
  const router = useRouter();

  // React Hook Form
  const { control, handleSubmit, reset } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Once validation is completed 
  const onSubmit = (data: SignupFormData) => {
    console.log("Sign-up submitted successfully:", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    // Goes to Confirmation page
    router.replace({
      pathname: "/confirmation",
      params: {
        firstName: data.firstName,
      },
    });
  }; 
  
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>
        Please fill in the form to sign up.
      </Text>

      <Field
        control={control}
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />

      <Field
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
      />

      <Field
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        email
      />

      <Field
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secure
      />

      <Field
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        secure
      />

      <Pressable
        style={styles.button}
        onPress={() => handleSubmit(onSubmit)()}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}


// Styling
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#2a2a2a",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 15,
    backgroundColor: "white",
    fontSize: 16,
  },

  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  fieldContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  inputError: {
    borderColor: "red",
  },
});
