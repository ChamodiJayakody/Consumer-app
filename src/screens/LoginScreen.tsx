import React, {useState} from 'react';
import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/userSlice';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });

  //   useEffect(() => {
  //   // Add any side effects here
  //   console.log('test');
  // }, []);

  const validateForm = () => {
    const newErrors = {
      email: false,
      password: false,
    };

    const newErrorMessages = {
      email: '',
      password: '',
    };

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
      newErrorMessages.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = true;
      newErrorMessages.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return !newErrors.email && !newErrors.password;
  };

  // ...existing state...
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;
        dispatch(setUser({email: user.email, uid: user.uid}));
        showMessage({
          message: 'Login successful',
          type: 'success',
          icon: 'auto',
        });
        navigation.replace('MainApp', {userName: email.split('@')[0]});
      } catch (error) {
        let message = 'Wrong credentials';
        if (error.code === 'auth/user-not-found') {
          message = 'User not registered';
        } else if (error.code === 'auth/wrong-password') {
          message = 'Wrong password, try again';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Please enter a valid email address.';
        }
        showMessage({
          message: message,
          type: 'danger',
          icon: 'auto',
        });
        setErrorMessages({
          ...errorMessages,
          password: message,
        });
        setErrors({
          ...errors,
          password: true,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3}}></View>

      <View style={styles.content}>
        <Image
          source={require('../assets/images/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.description}>Login to get started..</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email/phone number"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (errors.email) setErrors({...errors, email: false});
          }}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errorMessages.email}</Text>
        )}
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Password"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (errors.password) setErrors({...errors, password: false});
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errorMessages.password}</Text>
        )}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    //justifyContent: 'flex-end',
  },
  content: {
    flex: 0.3,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONTS.title,
    textAlign: 'center',
    fontSize: 24,
    color: COLORS.text.primary,
    lineHeight: 35,
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
  formContainer: {
    flex: 0.4,

    justifyContent: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: FONTS.description,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    marginBottom: 20,
    borderRadius: 100,
    fontSize: 16,
    fontFamily: FONTS.placeholder,
    color: COLORS.text.primary,
  },
  inputError: {
    borderWidth: 1.5,
    borderColor: COLORS.error,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: FONTS.forgotpassword,
  },
  loginButton: {
    backgroundColor: COLORS.background.primary,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.buttontext,
  },
});

export default LoginScreen;
