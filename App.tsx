import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { COLORS } from './src/theme/colors';
import {FONTS} from './src/theme/fonts';
import TabNavigator from './src/navigation/TabNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('./src/assets/images/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Millions of Offers.</Text>
          <Text style={styles.title}>Free on Loyality</Text>
          <Text style={styles.description}>
            Unlock millions of exclusive deals and discounts with Millions of Offers!
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.logInButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logInButtonText}>Log In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.createAccountButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    <FlashMessage position="top" />
    </Provider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom:40,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONTS.title,
    textAlign: 'center',
    fontSize: 24,
    //fontWeight: 'bold',
    color: COLORS.text.primary,
    lineHeight: 30,
  },
  description: {
    fontFamily: FONTS.description,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 300,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    //paddingHorizontal: 20,
    marginBottom: 30,
  },
  logInButton: {
    backgroundColor: COLORS.background.primary,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 15,
  },
  logInButtonText: {
    fontFamily: FONTS.buttontext,
    color: COLORS.white,
    fontSize: 16,
    //fontWeight: 'bold',
  },
  createAccountButton: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderColor: COLORS.border,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
  },
  createAccountButtonText: {
    fontFamily: FONTS.buttontext,
    fontSize: 16,
    color: COLORS.text.primary,
  },
});

export default App;