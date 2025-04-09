import { useOAuth } from "@clerk/clerk-expo";
import { Button, View, Text } from "react-native";

export default function SignIn() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign in to continue</Text>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
}