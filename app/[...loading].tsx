import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from '@/app/components/ThemedView';
import { ThemedText } from '@/app/components/ThemedText';

export default function LoadingScreen() {
  
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <ThemedText style={styles.text}>
        Loading...
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
}); 