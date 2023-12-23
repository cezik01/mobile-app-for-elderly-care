import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Provider } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import ChartData from 'types/ChartDataProps';
import { validateNumericInput } from 'helpers/validationSchemas/numericInputValidation';
import i18n from 'common/i18n/i18n';

const BloodPressureScreen = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const database = getDatabase();
  const userId = auth.currentUser?.uid;
  const bpRef = ref(database, 'bloodPressure/' + userId);

  const [isSystolicValid, setIsSystolicValid] = useState(true);
  const [isDiastolicValid, setIsDiastolicValid] = useState(true);

  useEffect(() => {
    const unsubscribe = onValue(bpRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const labels = Object.keys(data);
        const diastolicValues = labels.map((label) => data[label].diastolic);
        setChartData({
          labels: diastolicValues,
          datasets: [{ data: diastolicValues }],
        });
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleSubmit = () => {
    const newEntry = {
      systolic: parseInt(systolic, 10),
      diastolic: parseInt(diastolic, 10),
    };
    const newRef = ref(database, 'bloodPressure/' + userId + '/' + Date.now());
    update(newRef, newEntry).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          placeholder='Enter Systolic'
          value={systolic}
          onChangeText={(text) => {
            const { validText, isValid } = validateNumericInput(text);
            setSystolic(validText);
            setIsSystolicValid(isValid);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder='Enter Diastolic'
          value={diastolic}
          onChangeText={(text) => {
            const { validText, isValid } = validateNumericInput(text);
            setDiastolic(validText);
            setIsDiastolicValid(isValid);
          }}
          style={styles.input}
        />
        {!isSystolicValid && (
          <Text style={styles.warningText}>{i18n.t('EnterValidNumber')}</Text>
        )}
        {!isDiastolicValid && (
          <Text style={styles.warningText}>{i18n.t('EnterValidNumber')}</Text>
        )}
        <Button title='Submit' onPress={handleSubmit} />
        {!loading && (
          <BarChart
            data={chartData}
            width={400}
            height={250}
            yAxisLabel={''}
            yAxisSuffix={'1'}
            chartConfig={{
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#6495ED',
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  warningText: {
    color: 'red',
  }  
});

export default BloodPressureScreen;
