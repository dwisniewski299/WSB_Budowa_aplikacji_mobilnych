import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Field from '../components/Field';
import { getGoal } from '../data/repository';
import { amountToText } from '../logic/money';
import { createGoal, editGoal } from '../logic/savings';
import { styles } from '../styles';

export default function GoalFormScreen({ navigation, route }) {
  const id = route.params?.id;
  const [form, setForm] = useState({ name: '', target: '', deadline: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) {
      return;
    }
    getGoal(id)
      .then((goal) => {
        if (goal) {
          setForm({
            name: goal.name,
            target: amountToText(goal.target),
            deadline: goal.deadline,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Błąd', 'Nie udało się wczytać celu.');
      });
  }, [id]);

  function change(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function save() {
    setSaving(true);
    try {
      const result = id ? await editGoal(id, form) : await createGoal(form);
      setErrors(result);
      if (Object.keys(result).length === 0) {
        navigation.goBack();
        Alert.alert('Zapisano cel.');
      }
    } catch {
      Alert.alert('Błąd', 'Nie udało się zapisać celu. Spróbuj ponownie.');
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
