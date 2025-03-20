import { Tabs } from 'expo-router';
import { Chrome as Home, MessageCircle, Telescope, Gamepad2 as Gamepad, BrainCircuit } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: '#007AFF',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Communication',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="interaction"
        options={{
          title: 'Interaction',
          tabBarIcon: ({ color, size }) => <Telescope size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ color, size }) => <Gamepad size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="moto_skills"
        options={{
          title: 'Moto Skills',
          tabBarIcon: ({ color, size }) => <BrainCircuit size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}