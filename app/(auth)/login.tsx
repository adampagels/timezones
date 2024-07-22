import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import supabase from "../../lib/supabase";
import { Link } from "expo-router";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Sign In Error", error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          disabled={loading}
          onPress={() => signInWithEmail()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
      <Link href="/register">
        {/* <TouchableOpacity> */}
        <Text style={styles.buttonText}>SIGN UP</Text>
        {/* </TouchableOpacity> */}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "#000968",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  textInput: {
    borderColor: "#000968",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    color: "#fff",
    padding: 12,
    margin: 8,
  },
});
