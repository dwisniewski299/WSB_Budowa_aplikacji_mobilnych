import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getGoal, getPayment } from '../data/repository';
import { formatAmount } from '../logic/money';
import { removePayment } from '../logic/savings';
import { styles } from '../styles';

export default function PaymentDetailsScreen({ navigation, route }) {
  const { id } = route.params;
  const [payment, setPayment] = useState();
  const [goalName, setGoalName] = useState('');
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function load() {
        try {
          const row = await getPayment(id);
          const goal = row ? await getGoal(row.parentId) : null;
          setPayment(row);
          setGoalName(goal ? goal.name : '');
          setError('');
        } catch {
          setError('Nie udało się wczytać wpłaty.');
        }
      }
      load();
    }, [id])
  );

  function confirmDelete() {
    Alert.alert('Usunąć wpłatę?', 'Tej operacji nie można cofnąć.', [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: remove },
    ]);
  }

  async function remove() {
    try {
      await removePayment(id);
      navigation.goBack();
      Alert.alert('Usunięto wpłatę.');
    } catch {
      Alert.alert('Błąd', 'Nie udało się usunąć wpłaty. Spróbuj ponownie.');
    }
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (payment === undefined) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <ActivityIndicator style={styles.loading} size="large" />
      </SafeAreaView>
    );
  }

  if (payment === null) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <Text style={styles.empty}>Nie znaleziono wpłaty.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Text style={styles.title}>{formatAmount(payment.amount)}</Text>
      <Text style={styles.text}>Data: {payment.date}</Text>
      <Text style={styles.text}>Cel: {goalName}</Text>
      <Text style={styles.text}>Opis: {payment.note || 'brak'}</Text>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Button
            title="Edytuj wpłatę"
            onPress={() => navigation.navigate('PaymentForm', { id })}
          />
        </View>
        <View style={styles.rowItem}>
          <Button title="Usuń wpłatę" color="#b00020" onPress={confirmDelete} />
        </View>
      </View>
    </SafeAreaView>
  );
}
