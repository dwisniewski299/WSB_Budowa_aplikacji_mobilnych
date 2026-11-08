import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Field({ label, error, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        accessibilityLabel={label}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: '#111',
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    fontSize: 16,
    color: '#111',
  },
  inputError: {
    borderColor: '#b00020',
  },
  error: {
    marginTop: 4,
    fontSize: 14,
    color: '#b00020',
  },
});
