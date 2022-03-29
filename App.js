
import React, { useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './src/screen/LoginScreen';
import {HomeScreen} from './src/screen/HomeScreen';
import { SplashScreen } from './src/screen/SplashScree';
import { AuthContext } from './src/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            token: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    },
  );

  useEffect(() => {
    const getData = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {}
      dispatch({type: 'RESTORE_TOKEN', token: token});
      console.log(token)
    };
    getData();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        try {
          await AsyncStorage.setItem('token', 'Miguel Luna')
        } catch (e) {
          // saving error
        }
        dispatch({type: 'SIGN_IN', token: 'Miguel Luna'});
      },
      signOut: async () => {
        try {
          await AsyncStorage.setItem('token', null)
        } catch (e) {
          // saving error
        }
        dispatch({type: 'SIGN_OUT'})
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name='Splash' component={SplashScreen}/>
          ) : (state.token ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          ))
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
