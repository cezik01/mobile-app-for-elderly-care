import i18n from 'common/i18n/i18n';
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const NotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('NotFound')}</Text>
    </View>
  );
};

export default NotFound;
