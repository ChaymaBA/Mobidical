import { Tabs } from 'expo-router';
import { MessageCircle, Telescope, Gamepad2 as Gamepad, BrainCircuit, Settings, User } from 'lucide-react-native';
import { TouchableOpacity, ImageBackground, StyleSheet, View } from 'react-native';
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
          tabBarActiveTintColor: '#222223FF',
          headerStyle: { backgroundColor: 'transparent' },
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <TouchableOpacity onPress={handleProfilePress} style={{ marginRight: 20 }}>
                <User size={24} color="#1F1F1FFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettingsPress}>
                <Settings size={24} color="#1F1F1FFF" />
              </TouchableOpacity>
            </View>
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
