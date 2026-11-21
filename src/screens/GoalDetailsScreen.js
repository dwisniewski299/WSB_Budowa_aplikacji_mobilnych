import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getGoal, getPayments } from '../data/repository';
import { formatAmount } from '../logic/money';
import { removeGoal } from '../logic/savings';
import { styles } from '../styles';

export default function GoalDetailsScreen({ navigation, route }) {
  const { id } = route.params;
  const [goal, setGoal] = useState();
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

  function confirmDelete() {
    Alert.alert('Usunąć cel?', 'Tej operacji nie można cofnąć.', [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: remove },
    ]);
  }

  async function remove() {
    try {
      const message = await removeGoal(id);
      if (message) {
        Alert.alert('Nie można usunąć celu', message);
        return;
      }
      navigation.goBack();
      Alert.alert('Usunięto cel.');
    } catch {
      Alert.alert('Błąd', 'Nie udało się usunąć celu. Spróbuj ponownie.');
    }
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (goal === undefined) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <ActivityIndicator style={styles.loading} size="large" />
      </SafeAreaView>
    );
  }

  if (goal === null) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <Text style={styles.empty}>Nie znaleziono celu.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Text style={styles.title}>{goal.name}</Text>
      <Text style={styles.text}>Kwota docelowa: {formatAmount(goal.target)}</Text>
      <Text style={styles.text}>Termin: {goal.deadline}</Text>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Button title="Edytuj cel" onPress={() => navigation.navigate('GoalForm', { id })} />
        </View>
        <View style={styles.rowItem}>
          <Button title="Usuń cel" color="#b00020" onPress={confirmDelete} />
        </View>
      </View>
      <Text style={styles.section}>Wpłaty</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            accessibilityRole="button"
            onPress={() => navigation.navigate('PaymentDetails', { id: item.id })}
          >
            <Text style={styles.text}>
              {formatAmount(item.amount)}, {item.date}
            </Text>
            {item.note ? <Text style={styles.text}>{item.note}</Text> : null}
          </Pressable>
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
