import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { DATA } from '../../constants/data';

export default function HomeScreen() {
  const router = useRouter();

  const totalTitles = DATA.length;
  const totalFilms = DATA.filter(d => d.type === 'film').length;
  const totalSeries = DATA.filter(d => d.type === 'serie').length;
  const totalGenres = [...new Set(DATA.flatMap(d => d.genre))].length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.appName}>🎬 CineApp</Text>
        <Text style={styles.subtitle}>
          Découvrez, filtrez et gérez vos films et séries préférés.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Le catalogue en chiffres</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTitles}</Text>
          <Text style={styles.statLabel}>Titres</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalFilms}</Text>
          <Text style={styles.statLabel}>Films</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalSeries}</Text>
          <Text style={styles.statLabel}>Séries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalGenres}</Text>
          <Text style={styles.statLabel}>Genres</Text>
        </View>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/(tabs)/catalogue')}>
        <Text style={styles.primaryButtonText}>Parcourir le catalogue →</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.push('/(tabs)/formulaire')}>
        <Text style={styles.secondaryButtonText}>Recommander un titre</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#aaaaaa',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    width: '47%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#e50914',
  },
  statLabel: {
    fontSize: 13,
    color: '#888888',
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#e50914',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});