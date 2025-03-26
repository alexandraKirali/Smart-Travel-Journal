import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<TabParamList, 'Upload'>;

export default function UploadScreen({ navigation }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Upload</ThemedText>
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
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
}); 