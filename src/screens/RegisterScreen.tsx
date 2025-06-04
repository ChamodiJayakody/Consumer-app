import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/fonts';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phonenumber: false,
    password: false,
    confirmpassword: false
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    email: '',
    phonenumber: '',
    password: '',
    confirmpassword: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: false,
    email: false,
    phonenumber: false,
    password: false,
    confirmpassword: false
    };

    const newErrorMessages = {
      name: '',
      email: '',
      phonenumber: '',
      password: '',
      confirmpassword: ''
    };

    if (!name || !name.trim()) {
        newErrors.name = true; 
        newErrorMessages.name = 'Name is required';
    }

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
      newErrorMessages.email = 'Please enter a valid email address';
    }

    if (!phonenumber || !/^\d{10}$/.test(phonenumber)) {
        newErrors.phonenumber = true;
        newErrorMessages.phonenumber = 'Please enter a valid 10-digit phone number';
    }

    // Password validation (minimum 6 characters)
    if (!password || password.length < 6) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = true;
      newErrorMessages.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmpassword) {
        newErrors.confirmpassword = true;
        newErrorMessages.confirmpassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return !Object.values(newErrors).some(error => error);
  };

  const handleReg = () => {
    if (validateForm()) {
      
      console.log('Registration successful');
      navigation.replace('MainApp', { userName: name });
    }
  };

  return (
    <View style={styles.container}>
      

      <View style={styles.content}>
        
          <View style={styles.textContainer}>
            <Text style={styles.title}>Register</Text>

            <Text style={styles.description}>
              hello! Register to get started..
            </Text>
          </View>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            errors.name && styles.inputError
          ]}
          placeholder="Name"
          placeholderTextColor='COLORS.placeholder'
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors({...errors, name: false});
          }}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errorMessages.name}</Text>
        )}
        <TextInput
          style={[
            styles.input,
            errors.email && styles.inputError
          ]}
          placeholder="Email"
          placeholderTextColor='COLORS.placeholder'
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({...errors, email: false});
          }}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errorMessages.email}</Text>
        )}
        <TextInput
          style={[
            styles.input,
            errors.phonenumber && styles.inputError
          ]}
          placeholder="Phone number"
          placeholderTextColor="COLORS.placeholder"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={phonenumber}
          onChangeText={(text) => {
            setPhonenumber(text);
            if (errors.phonenumber) setErrors({...errors, phonenumber: false});
          }}
        />
        {errors.phonenumber && (
          <Text style={styles.errorText}>{errorMessages.phonenumber}</Text>
        )}
        <TextInput
          style={[
            styles.input,
            errors.password && styles.inputError
          ]}
          placeholder="Password"
          placeholderTextColor="COLORS.placeholder"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({...errors, password: false});
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errorMessages.password}</Text>
        )}
        <TextInput
          style={[
            styles.input,
            errors.confirmpassword && styles.inputError
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="COLORS.placeholder"
          secureTextEntry
          value={confirmpassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmpassword) setErrors({...errors, confirmpassword: false});
          }}
        />
        {errors.confirmpassword && (
          <Text style={styles.errorText}>{errorMessages.confirmpassword}</Text>
        )}

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={handleReg}
        >
          <Text style={styles.registerButtonText}>Register</Text>
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
    flex: 1,
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
    marginTop: 40,
    justifyContent: 'center',
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
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: FONTS.description,
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
    fontWeight: 'bold',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: COLORS.background.primary,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.buttontext,
  },
});

export default RegisterScreen;
