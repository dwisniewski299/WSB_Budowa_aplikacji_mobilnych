import { useState } from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupDatabase } from './data/database';
import GoalListScreen from './screens/GoalListScreen';
import GoalDetailsScreen from './screens/GoalDetailsScreen';
import GoalFormScreen from './screens/GoalFormScreen';
import PaymentFormScreen from './screens/PaymentFormScreen';
import PaymentDetailsScreen from './screens/PaymentDetailsScreen';
import { styles } from './styles';

const Stack = createNativeStackNavigator();

function startDatabase() {
  try {
    setupDatabase();
    return true;
  } catch {
    return false;
  }
}

export default function App() {
  const [ready] = useState(startDatabase);

  if (!ready) {
    return (
      <View style={styles.screen}>
        <Text style={styles.error}>Nie udało się uruchomić bazy danych.</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="GoalList"
            component={GoalListScreen}
            options={{ title: 'Cele oszczędnościowe' }}
          />
          <Stack.Screen
            name="GoalDetails"
            component={GoalDetailsScreen}
            options={{ title: 'Szczegóły celu' }}
          />
          <Stack.Screen
            name="GoalForm"
            component={GoalFormScreen}
            options={({ route }) => ({
              title: route.params?.id ? 'Edycja celu' : 'Nowy cel',
            })}
          />
          <Stack.Screen
            name="PaymentDetails"
            component={PaymentDetailsScreen}
            options={{ title: 'Szczegóły wpłaty' }}
          />
          <Stack.Screen
            name="PaymentForm"
            component={PaymentFormScreen}
            options={({ route }) => ({
              title: route.params?.id ? 'Edycja wpłaty' : 'Nowa wpłata',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
