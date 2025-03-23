import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PostScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Create Post</ThemedText>
      <ThemedText>Share your travel experiences here ✨</ThemedText>
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