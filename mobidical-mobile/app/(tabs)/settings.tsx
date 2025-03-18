import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/CustomText';
import { Button } from '@/components/Button';
import { useAuth } from '@/navigation/AuthContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text variant="h1">Settings</Text>
      <Button 
        title="Sign Out" 
        onPress={handleSignOut}
        variant="outline"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
});