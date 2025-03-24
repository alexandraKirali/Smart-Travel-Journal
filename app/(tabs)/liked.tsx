import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LikedScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Liked Posts</ThemedText>
      <ThemedText>Your liked posts will appear here ✨</ThemedText>
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
}); 