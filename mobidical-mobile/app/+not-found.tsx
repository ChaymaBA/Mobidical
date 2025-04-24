import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Not_foundstyles } from './Settings/stylesS'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={Not_foundstyles.container}>
        <Text style={Not_foundstyles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={Not_foundstyles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}


