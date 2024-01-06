import React from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from '../styles';
import AuthForm from 'components/Form/AuthForm';
import { signIn } from 'helpers/firebaseAuth/AuthService';
import { FirebaseError } from 'firebase/app';
import { useUser } from '../../../context/UserContext';
import i18n from 'common/i18n/i18n';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { updateUser } = useUser();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const { role, uid } = await signIn(values.email, values.password);
      updateUser({ role, uid });
      if (role === 'caregiver') {
        navigation.navigate('Caregiver Profile');
      } else if (role === 'patient') {
        navigation.navigate('Patient Profile');
      }
    } catch (error) {
      let errorMessage = '';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'The email you have entered is not registered.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'The email or password is invalid. Please try again.';
            break;
          default:
            errorMessage = 'An error occurred during login. Please try again.';
        }
      } else {
        errorMessage = 'An unexpected error occurred. Please try again.';
      }
      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <AuthForm onSubmit={handleLogin} buttonTitle="Login" showForgotPassword={true}>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.linkText}>{i18n.t('DontHaveAccount')}</Text>
      </TouchableOpacity>
    </AuthForm>
  );
};

export default LoginScreen;
