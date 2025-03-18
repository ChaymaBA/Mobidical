import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/CustomText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h1">Home</Text>
      <Text>Welcome to the home screen!</Text>
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