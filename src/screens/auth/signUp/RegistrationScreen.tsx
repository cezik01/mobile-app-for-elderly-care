import React from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from '../styles';
import AuthForm from 'components/Form/AuthForm';
import { signUp } from 'helpers/firebaseAuth/AuthService';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { Button, Menu } from 'react-native-paper';
import i18n from 'common/i18n/i18n';
import LanguageSwitch from 'components/CustomDrawer/LanguageSwitch';

const RegistrationScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [role, setRole] = useState('');
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleRegistration = async (values: { email: string; password: string }) => {
    if (!role) {
      Alert.alert('Registration Error', 'Please select your Role to continue.');
      return;
    }

    try {
      await signUp(values.email, values.password, role);
      navigation.navigate('Login');
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMessage = '';
        switch (error.code) {
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
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button mode="outlined" onPress={openMenu}>
              {role ? role : i18n.t('SelectYourRole')}
            </Button>
          }>
          <Menu.Item onPress={() => {
            setRole('Patient');
            closeMenu();
          }}
            title={i18n.t('Patient')} />
          <Menu.Item onPress={() => {
            setRole('Caregiver');
            closeMenu();
          }}
            title={i18n.t('Caregiver')} />
        </Menu>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>{i18n.t('LoginClick')}</Text>
      </TouchableOpacity>
      <View style={styles.switchContainer}>
        <Text style={styles.changeSwitch}>{i18n.t('ChangeLanguageSwitch')}:</Text>
        <LanguageSwitch />
      </View>
    </AuthForm>
  );
};

export default RegistrationScreen;
