import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/app/components/ThemedText';
import { ThemedView } from '@/app/components/ThemedView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<TabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home</ThemedText>
      <ThemedText>Welcome to Smart Travel Journal ✨</ThemedText>
      
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
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#00929a',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
}); 