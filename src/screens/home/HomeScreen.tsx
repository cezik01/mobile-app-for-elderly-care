import i18n from 'common/i18n/i18n';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

const HomeScreen = () => {

  return (
    <View style={styles.title}>
      <Text>{i18n.t('HomeScreen')}</Text>
    </View>
  );
};

export default HomeScreen;
