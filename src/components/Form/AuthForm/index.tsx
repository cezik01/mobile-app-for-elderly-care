import React, { useState, ReactNode } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { emailPasswordValidationSchema } from 'helpers/validationSchemas/emailPasswordLoginValidationSchema';
import i18n from 'common/i18n/i18n';

interface FormFields {
  email: string;
  password: string;
}

interface AuthFormProps {
  onSubmit: (values: FormFields) => void;
  buttonTitle: string;
  children: ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, buttonTitle, children }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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

          {children}
        </View>
      )}
    </Formik>
  );
};


export default AuthForm;
