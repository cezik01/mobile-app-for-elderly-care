import i18n from 'common/i18n/i18n';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const NotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('NotFound')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default NotFound;
