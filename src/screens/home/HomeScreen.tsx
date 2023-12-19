import i18n from 'common/i18n/i18n';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {

  return (
    <View style={styles.title}>
      <Text>{i18n.t('HomeScreen')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


export default HomeScreen;
