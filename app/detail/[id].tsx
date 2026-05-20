import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DATA } from '../../constants/data';
import { useFavorites } from '../../hooks/FavoritesContext';
import Badge from '../../components/Badge';
import AppButton from '../../components/AppButton';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const item = DATA.find(d => d.id === id);

  if (!item) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Titre introuvable.</Text>
        <AppButton label="Retour" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Retour</Text>
      </Pressable>

      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>🎬</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.badgeRow}>
        <Badge
          label={item.type === 'film' ? 'Film' : 'Série'}
          color={item.type === 'film' ? '#3b82f6' : '#8b5cf6'}
        />
        {item.genre.map(g => (
          <Badge key={g} label={g} color="#e50914" />
        ))}
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Année</Text>
          <Text style={styles.metaValue}>{item.year}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Note</Text>
          <Text style={styles.metaValue}>⭐ {item.rating}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Réalisateur</Text>
          <Text style={styles.metaValue}>{item.director}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>
            {item.type === 'film' ? 'Durée' : 'Saisons'}
          </Text>
          <Text style={styles.metaValue}>
            {item.type === 'film' ? `${item.duration} min` : `${item.seasons} saison${item.seasons! > 1 ? 's' : ''}`}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Résumé</Text>
      <Text style={styles.summary}>{item.summary}</Text>

      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={styles.tagsRow}>
        {item.tags.map(tag => (
          <Badge key={tag} label={`#${tag}`} color="#444" />
        ))}
      </View>

      <AppButton
        label={isFavorite(item.id) ? '❤️ Retirer des favoris' : '🤍 Ajouter aux favoris'}
        onPress={() => toggleFavorite(item.id)}
        variant={isFavorite(item.id) ? 'secondary' : 'primary'}
      />
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
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: '#e50914',
    fontSize: 15,
    fontWeight: '600',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  placeholderText: {
    fontSize: 64,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  metaItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    width: '47%',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  metaLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 22,
    marginBottom: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  notFound: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 20,
  },
});