import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './src/screen/LoginScreen';
import {HomeScreen} from './src/screen/HomeScreen';
import {SplashScreen} from './src/screen/SplashScree';
import {AuthContext} from './src/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {reducer, initialState} from './src/context/authReducer';
import {TOKEN_NAME} from './src/config';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async token => {
      try {
        await AsyncStorage.getItem(token);
      } catch (error) {
        Alert.alert(error);
      }
      dispatch({type: 'RESTORE_TOKEN', token: token});
    };
    getData(TOKEN_NAME);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async tokenValue => {
        try {
          await AsyncStorage.setItem(TOKEN_NAME, tokenValue);
        } catch (e) {
          // saving error
        }
        dispatch({type: 'SIGN_IN', token: tokenValue});
      },
      signOut: async () => {
        try {
          await AsyncStorage.setItem(TOKEN_NAME, null);
        } catch (e) {
          // saving error
        }
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.token ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
