import { useState } from 'react';
import { Alert, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Field from '../components/Field';
import { createGoal } from '../logic/savings';
import { styles } from '../styles';

export default function GoalFormScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', target: '', deadline: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function change(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function save() {
    setSaving(true);
    try {
      const result = await createGoal(form);
      setErrors(result);
      if (Object.keys(result).length === 0) {
        navigation.goBack();
      }
    } catch {
      Alert.alert('Błąd', 'Nie udało się zapisać celu. Spróbuj ponownie.');
    }
    setSaving(false);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Field
          label="Nazwa celu"
          value={form.name}
          onChangeText={(value) => change('name', value)}
          error={errors.name}
          maxLength={100}
        />
        <Field
          label="Kwota docelowa (zł)"
          value={form.target}
          onChangeText={(value) => change('target', value)}
          error={errors.target}
          keyboardType="numeric"
          placeholder="np. 5000 lub 5000,50"
        />
        <Field
          label="Termin (RRRR-MM-DD)"
          value={form.deadline}
          onChangeText={(value) => change('deadline', value)}
          error={errors.deadline}
          placeholder="np. 2027-06-30"
          maxLength={10}
        />
        <Button title="Zapisz" onPress={save} disabled={saving} />
      </ScrollView>
    </SafeAreaView>
  );
}
