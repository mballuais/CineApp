import { Stack } from 'expo-router';
import { FavoritesProvider } from '../hooks/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="detail/[id]" />
      </Stack>
    </FavoritesProvider>
  );
}