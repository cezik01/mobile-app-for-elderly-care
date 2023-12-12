import React from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from '../styles';
import AuthForm from 'components/Form/AuthForm';
import { signIn } from 'helpers/firebaseAuth/AuthService';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { UserProvider, useUser } from '../../../context/UserContext';



const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { updateUser } = useUser();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const { role, uid } = await signIn(values.email, values.password); 
      updateUser({ role, uid });
      if (role === 'caregiver') {
        navigation.navigate('CaregiverProfile');
      } else if (role === 'patient') {
        navigation.navigate('PatientProfile');
      }
      
    } catch (error) { 
      let errorMessage = '';
      if (error instanceof FirebaseError) {
        switch(error.code) {
          case 'auth/user-not-found': 
            errorMessage = 'The email you have written is not registered.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'The e-mail or password is invalid. Please try again.';
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

  const handleForgotPassword = () => {
   /* const email = await promptForEmail(); // Implement this function to get the user's email
    if (!email) return; // Exit if no email is provided
  
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Check your email', 'A link to reset your password has been sent to your email address.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }*/
    navigation.navigate('PasswordReset');
  };

  return (
    <AuthForm onSubmit={handleLogin} buttonTitle="Login">
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.linkText}>Don't have an account? Click here to sign up</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </AuthForm>
  );
};

export default LoginScreen;
