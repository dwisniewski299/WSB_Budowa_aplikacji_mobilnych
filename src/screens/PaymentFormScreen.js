import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Field from '../components/Field';
import { getPayment } from '../data/repository';
import { amountToText } from '../logic/money';
import { createPayment, editPayment } from '../logic/savings';
import { styles } from '../styles';

export default function PaymentFormScreen({ navigation, route }) {
  const { goalId, id } = route.params;
  const [form, setForm] = useState({ amount: '', date: '', note: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) {
      return;
    }
    getPayment(id)
      .then((payment) => {
        if (payment) {
          setForm({
            amount: amountToText(payment.amount),
            date: payment.date,
            note: payment.note || '',
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Błąd', 'Nie udało się wczytać wpłaty.');
      });
  }, [id]);

  function change(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function save() {
    setSaving(true);
    try {
      const result = id ? await editPayment(id, form) : await createPayment(goalId, form);
      setErrors(result);
      if (Object.keys(result).length === 0) {
        navigation.goBack();
        Alert.alert('Zapisano wpłatę.');
      }
    } catch {
      Alert.alert('Błąd', 'Nie udało się zapisać wpłaty. Spróbuj ponownie.');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <ActivityIndicator style={styles.loading} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {errors.goal ? <Text style={styles.error}>{errors.goal}</Text> : null}
        <Field
          label="Kwota wpłaty (zł)"
          value={form.amount}
          onChangeText={(value) => change('amount', value)}
          error={errors.amount}
          keyboardType="numeric"
          placeholder="np. 200 lub 200,50"
        />
        <Field
          label="Data wpłaty (RRRR-MM-DD)"
          value={form.date}
          onChangeText={(value) => change('date', value)}
          error={errors.date}
          placeholder="np. 2026-11-08"
          maxLength={10}
        />
        <Field
          label="Opis (opcjonalnie)"
          value={form.note}
          onChangeText={(value) => change('note', value)}
          maxLength={200}
        />
        <Button title="Zapisz" onPress={save} disabled={saving} />
      </ScrollView>
    </SafeAreaView>
  );
}
