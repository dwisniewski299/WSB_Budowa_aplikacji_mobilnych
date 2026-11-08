import { useCallback, useState } from 'react';
import { Button, FlatList, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getGoals } from '../data/repository';
import { formatAmount } from '../logic/money';
import { styles } from '../styles';

export default function GoalListScreen({ navigation }) {
  const [goals, setGoals] = useState(null);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      getGoals()
        .then((rows) => {
          setGoals(rows);
          setError('');
        })
        .catch(() => setError('Nie udało się wczytać celów.'));
    }, [])
  );

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={goals || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            accessibilityRole="button"
            onPress={() => navigation.navigate('GoalDetails', { id: item.id })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>
              {formatAmount(item.target)}, termin {item.deadline}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          goals ? <Text style={styles.empty}>Nie masz jeszcze żadnych celów.</Text> : null
        }
      />
      <Button title="Dodaj cel" onPress={() => navigation.navigate('GoalForm')} />
    </SafeAreaView>
  );
}
