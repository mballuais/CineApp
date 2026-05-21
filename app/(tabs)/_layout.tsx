import { Tabs } from 'expo-router';
import { useFavorites } from '../../hooks/FavoritesContext';

export default function TabsLayout() {
  const { favorites } = useFavorites();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0f0f0f', borderTopColor: '#222' },
      tabBarActiveTintColor: '#e50914',
      tabBarInactiveTintColor: '#888',
    }}>
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="catalogue" options={{ title: 'Catalogue' }} />
      <Tabs.Screen
        name="favoris"
        options={{
          title: 'Favoris',
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          tabBarBadgeStyle: { backgroundColor: '#e50914' },
        }}
      />
      <Tabs.Screen name="formulaire" options={{ title: 'Recommander' }} />
    </Tabs>
  );
}