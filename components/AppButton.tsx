import { StyleSheet, Text, Pressable } from 'react-native';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export default function AppButton({ label, onPress, variant = 'primary' }: AppButtonProps) {
  return (
    <Pressable
      style={[styles.button, variant === 'secondary' ? styles.secondary : styles.primary]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === 'secondary' ? styles.secondaryText : styles.primaryText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#e50914',
  },
  secondary: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#ffffff',
  },
});