import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Media } from '../constants/data';
import Badge from './Badge';

interface MovieCardProps {
  item: Media;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function MovieCard({ item, isFavorite, onToggleFavorite }: MovieCardProps) {
  const router = useRouter();

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/detail/${item.id}`)}>
      <View style={styles.imagePlaceholder}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>🎬</Text>
        )}
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Pressable onPress={() => onToggleFavorite(item.id)}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>

        <View style={styles.badgeRow}>
          <Badge label={item.type === 'film' ? 'Film' : 'Série'} color={item.type === 'film' ? '#3b82f6' : '#8b5cf6'} />
          <Badge label={item.genre[0]} color="#e50914" />
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>{item.year}</Text>
          <Text style={styles.meta}>⭐ {item.rating}</Text>
          <Text style={styles.meta}>
            {item.type === 'film' ? `${item.duration} min` : `${item.seasons} saison${item.seasons! > 1 ? 's' : ''}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  imagePlaceholder: {
    width: 90,
    height: 120,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 90,
    height: 120,
    resizeMode: 'cover',
  },
  placeholderText: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  meta: {
    fontSize: 12,
    color: '#888888',
  },
});