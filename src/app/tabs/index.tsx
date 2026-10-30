import { View, Text, Pressable, StyleSheet, } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  function handleSignUp() {
    router.push("/tabs/signup");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Our App
      </Text>

      <Text style={styles.subtitle}>
        Create an account to get started.
      </Text>

      <Pressable
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: "#666",
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
