import { StyleSheet, Text, Pressable } from 'react-native';

interface FilterButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function FilterButton({ label, active, onPress }: FilterButtonProps) {
  return (
    <Pressable
      style={[styles.button, active ? styles.active : styles.inactive]}
      onPress={onPress}
    >
      <Text style={[styles.text, active ? styles.activeText : styles.inactiveText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  active: {
    backgroundColor: '#e50914',
    borderColor: '#e50914',
  },
  inactive: {
    backgroundColor: 'transparent',
    borderColor: '#333333',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: '#ffffff',
  },
  inactiveText: {
    color: '#888888',
  },
});