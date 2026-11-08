import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  empty: {
    marginVertical: 24,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  error: {
    marginBottom: 12,
    fontSize: 16,
    color: '#b00020',
  },
});
