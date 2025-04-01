import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<TabParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText>Account info will be displayed here ✨</ThemedText>
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
    backgroundColor: '#00929a',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
}); 