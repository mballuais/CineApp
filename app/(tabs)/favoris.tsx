import { StyleSheet, Text, View, FlatList } from 'react-native';
import { DATA } from '../../constants/data';
import { useFavorites } from '../../hooks/FavoritesContext';
import MovieCard from '../../components/MovieCard';
import EmptyState from '../../components/EmptyState';

export default function FavorisScreen() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteItems = DATA.filter(d => favorites.includes(d.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Favoris</Text>
        <Text style={styles.count}>{favoriteItems.length} titre{favoriteItems.length !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={favoriteItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            message="Aucun favori pour le moment. Ajoutez des titres depuis le catalogue !"
            emoji="❤️"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  count: {
    fontSize: 14,
    color: '#e50914',
    fontWeight: '600',
  },
});