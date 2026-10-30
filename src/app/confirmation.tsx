import { View, Text, Pressable, StyleSheet, } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ConfirmationScreen() {
  const router = useRouter();

  // Receive the first name from the sign-up form
  const { firstName } = useLocalSearchParams<{
    firstName: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sign Up Successful!
      </Text>

      <Text style={styles.message}>
        Account created for {firstName}!
      </Text>

      <Text style={styles.subtitle}>
        Your form has been submitted successfully.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/tabs/signup")}
      >
        <Text style={styles.buttonText}>
          Back to Sign Up
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 20,
    textAlign: "center",
  },

  message: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
