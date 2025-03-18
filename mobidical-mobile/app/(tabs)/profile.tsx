import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/CustomText';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h1">Profile</Text>
      <Text>Your profile information goes here</Text>
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
});