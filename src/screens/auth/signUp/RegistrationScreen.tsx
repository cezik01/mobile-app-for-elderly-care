import React from 'react';
import { Alert, TouchableOpacity, Text, View, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from '../styles';
import AuthForm from 'components/Form/AuthForm';
import { signUp } from 'helpers/firebaseAuth/AuthService';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import i18n from 'common/i18n/i18n';

const RegistrationScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [role, setRole] = useState('patient');

  const handleRegistration = async (values: { email: string; password: string }) => {
    try {
      await signUp(values.email, values.password,role);
      navigation.navigate('Login');
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = '';
        switch(error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please use a different email.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password should be at least 6 characters.';
            break;
         
          default:
            errorMessage = 'An error occurred during registration. Please try again.';
        }
        Alert.alert('Registration Error', errorMessage);
      } else {
        Alert.alert('Registration Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <AuthForm onSubmit={handleRegistration} buttonTitle="SignUp">
    <View style={styles.pickerContainer}>
    <RNPickerSelect
    placeholder={{ label: "Select a Role..."}}
  onValueChange={(value) => setRole(value)}
  items={[
    { label: "Patient", value: "patient" },
    { label: "Caregiver", value: "caregiver" },
  ]}
  value={role}
  useNativeAndroidPickerStyle={false} 
/>
    </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>{i18n.t('LoginClick')}</Text>
      </TouchableOpacity>
    </AuthForm>
  );
};


export default RegistrationScreen;
