import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Contacts Screen</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactsScreen;
