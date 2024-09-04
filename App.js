import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/login';
import MoviesScreen from './src/screens/movies';
import PriceComparisonScreen from './src/screens/comparison';
import MovieDetailsScreen from './src/screens/details-movie';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Filmes" component={MoviesScreen} />
        <Stack.Screen name="Comparador" component={PriceComparisonScreen} />
        <Stack.Screen name="Detalhes" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
