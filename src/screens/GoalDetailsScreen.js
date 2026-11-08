import { useCallback, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getGoal, getPayments } from '../data/repository';
import { formatAmount } from '../logic/money';
import { styles } from '../styles';

export default function GoalDetailsScreen({ navigation, route }) {
  const { id } = route.params;
  const [goal, setGoal] = useState(null);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      Promise.all([getGoal(id), getPayments(id)])
        .then(([goalRow, paymentRows]) => {
          setGoal(goalRow);
          setPayments(paymentRows);
          setError('');
        })
        .catch(() => setError('Nie udało się wczytać danych celu.'));
    }, [id])
  );

  if (error) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!goal) {
    return null;
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Text style={styles.title}>{goal.name}</Text>
      <Text style={styles.text}>Kwota docelowa: {formatAmount(goal.target)}</Text>
      <Text style={styles.text}>Termin: {goal.deadline}</Text>
      <Text style={styles.section}>Wpłaty</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>
              {formatAmount(item.amount)}, {item.date}
            </Text>
            {item.note ? <Text style={styles.text}>{item.note}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Brak wpłat dla tego celu.</Text>}
      />
      <Button
        title="Dodaj wpłatę"
        onPress={() => navigation.navigate('PaymentForm', { goalId: id })}
      />
    </SafeAreaView>
  );
}
