import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router, Redirect } from 'expo-router';
import { ThemedText } from '@/app/components/ThemedText';
import { ThemedView } from '@/app/components/ThemedView';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from './hooks/warmUpBrowser';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import React from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const handleGoogleSignIn = React.useCallback(async () => {
    try {
      console.log('Starting OAuth flow...');
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log('OAuth flow completed:', { createdSessionId });
      
      if (createdSessionId && setActive) {
        console.log('Setting active session...');
        await setActive({ session: createdSessionId });
        console.log('Session set, navigating to Home...');
        router.replace('/(tabs)/Home');
      } else {
        console.log('No session created or setActive not available');
        Alert.alert('Error', 'Failed to create session');
      }
    } catch (err) {
      console.error("OAuth error:", err);
      Alert.alert('Error', 'Failed to sign in with Google');
    }
  }, [startOAuthFlow]);

  return (
    <ThemedView style={styles.container}>
      <SignedIn>
        <Redirect href="/(tabs)/Home" />
      </SignedIn>
      
      <SignedOut>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Welcome to Smart Travel Journal</ThemedText>
          <ThemedText style={styles.subtitle}>Your personal travel companion ✨</ThemedText>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleGoogleSignIn}
          >
            <ThemedText style={styles.buttonText}>Sign in with Google</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SignedOut>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    padding: 15,
    backgroundColor: '#00929a',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 