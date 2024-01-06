import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { emailPasswordValidationSchema } from 'helpers/validationSchemas/emailPasswordLoginValidationSchema';
import i18n from 'common/i18n/i18n';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { AuthFormProps } from 'types/AuthFormProps';
import { FormFields } from 'types/FormFieldsProps';

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, buttonTitle, showForgotPassword, children }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const auth = getAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Check your email', 'A link to reset your password has been sent to your email address.');
      setResetEmail('');
      setShowResetForm(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={emailPasswordValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }: FormikProps<FormFields>) => (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <MaterialIcons
                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                size={24}
                style={styles.passwordVisibilityIcon}
              />
            </TouchableOpacity>
          </View>
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>{i18n.t(buttonTitle)}</Text>
          </TouchableOpacity>

          {showForgotPassword && !showResetForm && (
            <TouchableOpacity onPress={() => setShowResetForm(true)}>
              <Text style={styles.linkText}>{i18n.t('ForgotPassword')}</Text>
            </TouchableOpacity>
          )}

          {showResetForm && (
            <View>
              <TextInput
                style={[styles.textInput, styles.forgotPasswordTextInput]}
                placeholder="Enter your email for password reset"
                onChangeText={setResetEmail}
                value={resetEmail}
              />
              <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
                <Text style={styles.buttonText}>{i18n.t('Send')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {children}
        </View>
      )}
    </Formik>
  );
};

export default AuthForm;
