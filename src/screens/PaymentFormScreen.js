import { useState } from 'react';
import { Alert, Button, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Field from '../components/Field';
import { createPayment } from '../logic/savings';
import { styles } from '../styles';

export default function PaymentFormScreen({ navigation, route }) {
  const { goalId } = route.params;
  const [form, setForm] = useState({ amount: '', date: '', note: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function change(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function save() {
    setSaving(true);
    try {
      const result = await createPayment(goalId, form);
      setErrors(result);
      if (Object.keys(result).length === 0) {
        navigation.goBack();
      }
    } catch {
      Alert.alert('Błąd', 'Nie udało się zapisać wpłaty. Spróbuj ponownie.');
    }
    setSaving(false);
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
