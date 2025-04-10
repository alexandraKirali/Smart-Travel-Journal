import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/app/components/ThemedText';
import { ThemedView } from '@/app/components/ThemedView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../lib/navigation';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

type Props = NativeStackScreenProps<TabParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      console.error('Error signing out:', err);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText>Account info will be displayed here ✨</ThemedText>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignOut}
      >
        <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
      </TouchableOpacity>
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 