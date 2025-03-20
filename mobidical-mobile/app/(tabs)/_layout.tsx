import { Tabs } from 'expo-router';
import { MessageCircle, Telescope, Gamepad2 as Gamepad, BrainCircuit, Settings, User } from 'lucide-react-native';
import { TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router'; // Importer router pour la navigation

export default function TabLayout() {
  // Fonction pour gérer le clic sur l'icône des paramètres
  const handleSettingsPress = () => {
    console.log('Settings icon pressed');
    router.push('/settings'); // Naviguer vers l'écran des paramètres
  };

  
  const handleProfilePress = () => {
    console.log('Profile icon pressed');
    router.push('/profil'); 
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.png')} 
      style={styles.background}
    >
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#434344FF',
          headerStyle: { backgroundColor: 'transparent' }, // En-tête transparent
          tabBarStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Barre d'onglets semi-transparente
            borderTopWidth: 0,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleProfilePress} style={{ marginLeft: 15 }}>
              <User size={24} color="#434344FF" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSettingsPress} style={{ marginRight: 15 }}>
              <Settings size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    resizeMode: 'cover', 
  },
});
