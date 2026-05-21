import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import FilterButton from '../../components/FilterButton';
import AppButton from '../../components/AppButton';

interface FormData {
  title: string;
  type: string;
  genre: string;
  director: string;
  year: string;
  rating: string;
  comment: string;
}

interface FormErrors {
  title?: string;
  type?: string;
  genre?: string;
  year?: string;
  rating?: string;
  comment?: string;
}

const GENRES = ['Action', 'Drame', 'Thriller', 'Science-Fiction', 'Horreur', 'Aventure', 'Fantastique', 'Crime', 'Histoire', 'Mystère'];
const TYPES = ['Film', 'Série'];

export default function FormulaireScreen() {
  const [form, setForm] = useState<FormData>({
    title: '',
    type: '',
    genre: '',
    director: '',
    year: '',
    rating: '',
    comment: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.title.trim()) newErrors.title = 'Le titre est obligatoire.';
    if (!form.type) newErrors.type = 'Le type est obligatoire.';
    if (!form.genre) newErrors.genre = 'Le genre est obligatoire.';
    if (!form.year.trim()) {
      newErrors.year = "L'année est obligatoire.";
    } else if (!/^\d{4}$/.test(form.year) || parseInt(form.year) < 1900 || parseInt(form.year) > 2030) {
      newErrors.year = "L'année doit être valide (ex: 2023).";
    }
    if (form.rating) {
      const r = parseFloat(form.rating);
      if (isNaN(r) || r < 0 || r > 5) newErrors.rating = 'La note doit être entre 0 et 5.';
    }
    if (form.comment && form.comment.trim().length < 20) {
      newErrors.comment = 'Le commentaire doit faire au moins 20 caractères.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm({ title: '', type: '', genre: '', director: '', year: '', rating: '', comment: '' });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>🎉</Text>
        <Text style={styles.successTitle}>Merci pour ta recommandation !</Text>
        <Text style={styles.successSubtitle}>"{form.title}" a bien été soumis.</Text>
        <AppButton label="Faire une autre recommandation" onPress={handleReset} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Recommander</Text>
      <Text style={styles.subtitle}>Tu as un coup de coeur ? Partage-le !</Text>

      <Text style={styles.label}>Titre *</Text>
      <TextInput
        style={[styles.input, errors.title ? styles.inputError : null]}
        placeholder="Ex: Inception"
        placeholderTextColor="#555"
        value={form.title}
        onChangeText={v => setForm({ ...form, title: v })}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <Text style={styles.label}>Type *</Text>
      <View style={styles.optionRow}>
        {TYPES.map(t => (
          <FilterButton
            key={t}
            label={t}
            active={form.type === t}
            onPress={() => setForm({ ...form, type: t })}
          />
        ))}
      </View>
      {errors.type && <Text style={styles.error}>{errors.type}</Text>}

      <Text style={styles.label}>Genre *</Text>
      <View style={styles.optionRow}>
        {GENRES.map(g => (
          <FilterButton
            key={g}
            label={g}
            active={form.genre === g}
            onPress={() => setForm({ ...form, genre: g })}
          />
        ))}
      </View>
      {errors.genre && <Text style={styles.error}>{errors.genre}</Text>}

      <Text style={styles.label}>Réalisateur / Créateur</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Christopher Nolan"
        placeholderTextColor="#555"
        value={form.director}
        onChangeText={v => setForm({ ...form, director: v })}
      />

      <Text style={styles.label}>Année *</Text>
      <TextInput
        style={[styles.input, errors.year ? styles.inputError : null]}
        placeholder="Ex: 2023"
        placeholderTextColor="#555"
        value={form.year}
        onChangeText={v => setForm({ ...form, year: v })}
        keyboardType="numeric"
      />
      {errors.year && <Text style={styles.error}>{errors.year}</Text>}

      <Text style={styles.label}>Note personnelle (0 à 5)</Text>
      <TextInput
        style={[styles.input, errors.rating ? styles.inputError : null]}
        placeholder="Ex: 4.5"
        placeholderTextColor="#555"
        value={form.rating}
        onChangeText={v => setForm({ ...form, rating: v })}
        keyboardType="decimal-pad"
      />
      {errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

      <Text style={styles.label}>Commentaire (min. 20 caractères)</Text>
      <TextInput
        style={[styles.input, styles.textarea, errors.comment ? styles.inputError : null]}
        placeholder="Pourquoi tu recommandes ce titre ?"
        placeholderTextColor="#555"
        value={form.comment}
        onChangeText={v => setForm({ ...form, comment: v })}
        multiline
        numberOfLines={4}
      />
      {errors.comment && <Text style={styles.error}>{errors.comment}</Text>}

      <AppButton label="Envoyer ma recommandation" onPress={handleSubmit} />
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 28,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cccccc',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  inputError: {
    borderColor: '#e50914',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  error: {
    color: '#e50914',
    fontSize: 12,
    marginTop: 4,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
    textAlign: 'center',
  },
});