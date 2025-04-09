import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

export const CLERK_FRONTEND_API = Constants.expoConfig?.extra?.clerkFrontendApi;

export function withClerkProvider(App: React.ComponentType) {
  return function ClerkWrappedApp(props: any) {
    return (
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={CLERK_FRONTEND_API}
      >
        <App {...props} />
      </ClerkProvider>
    );
  };
}