import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { useState } from 'react';
import { DATA } from '../../constants/data';
import { useFavorites } from '../../hooks/FavoritesContext';
import MovieCard from '../../components/MovieCard';
import FilterButton from '../../components/FilterButton';
import EmptyState from '../../components/EmptyState';

const GENRES = ['Tous', ...new Set(DATA.flatMap(d => d.genre))];
const TYPES = ['Tous', 'Films', 'Séries'];

export default function CatalogueScreen() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('Tous');
  const [activeGenre, setActiveGenre] = useState('Tous');
  const { toggleFavorite, isFavorite } = useFavorites();

  const filtered = DATA.filter(item => {
    const q = search.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(q) ||
      item.genre.some(g => g.toLowerCase().includes(q)) ||
      item.director.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q));

    const matchType =
      activeType === 'Tous' ||
      (activeType === 'Films' && item.type === 'film') ||
      (activeType === 'Séries' && item.type === 'serie');

    const matchGenre =
      activeGenre === 'Tous' || item.genre.includes(activeGenre);

    return matchSearch && matchType && matchGenre;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogue</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un titre, genre, réalisateur..."
        placeholderTextColor="#555"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        {TYPES.map(type => (
          <FilterButton
            key={type}
            label={type}
            active={activeType === type}
            onPress={() => setActiveType(type)}
          />
        ))}
      </View>

      <View style={styles.filterRow}>
        {GENRES.map(genre => (
          <FilterButton
            key={genre}
            label={genre}
            active={activeGenre === genre}
            onPress={() => setActiveGenre(genre)}
          />
        ))}
      </View>

      <Text style={styles.resultsCount}>
        {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ListEmptyComponent={<EmptyState message="Aucun résultat trouvé." emoji="🔍" />}
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  resultsCount: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
});