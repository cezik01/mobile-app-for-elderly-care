import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { Provider } from 'react-native-paper';
import { validateNumericInput } from 'helpers/validationSchemas/numericInputValidation';
import i18n from 'common/i18n/i18n';
import BloodPressureEntry from 'types/BloodPressureEntry';
import { BarChart } from 'react-native-chart-kit';
import { formatDate, parseDate } from 'helpers/date/dateHelper';

const BloodPressureScreen = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [loading, setLoading] = useState(true);
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureEntry[]>([]);

  const auth = getAuth();
  const database = getDatabase();
  const userId = auth.currentUser?.uid;
  const bpRef = ref(database, 'bloodPressure/' + userId);

  const [isSystolicValid, setIsSystolicValid] = useState(true);
  const [isDiastolicValid, setIsDiastolicValid] = useState(true);
  const [editingEntry, setEditingEntry] = useState<BloodPressureEntry | null>(null);

  useEffect(() => {
    const unsubscribe = onValue(bpRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          date: key,
          ...data[key]
        }));
        setBloodPressureData(formattedData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (item: BloodPressureEntry) => {
    setSystolic(String(item.systolic));
    setDiastolic(String(item.diastolic));
    setEditingEntry(item);
  };

  const handleDelete = (date: string) => {
    const deleteRef = ref(database, 'bloodPressure/' + userId + '/' + date);

    remove(deleteRef).then(() => {
      const updatedData = bloodPressureData.filter(entry => entry.date !== date);
      setBloodPressureData(updatedData);
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const handleSubmit = () => {
    if (!systolic || !diastolic) {
      Alert.alert('Error', 'Both Systolic and Diastolic values are required.');
      return;
    }

    const newEntry = {
      systolic: parseInt(systolic, 10),
      diastolic: parseInt(diastolic, 10),
    };

    const entryRef = editingEntry
      ? ref(database, 'bloodPressure/' + userId + '/' + editingEntry.date)
      : ref(database, 'bloodPressure/' + userId + '/' + Date.now());

    update(entryRef, newEntry).then(() => {
      setEditingEntry(null);
      setSystolic('');
      setDiastolic('');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const prepareChartData = (days: number) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const endDate = new Date();

    const filteredData = bloodPressureData.filter(entry => {
      const entryDate = parseDate(entry.date);
      if (isNaN(entryDate.getTime())) {
        console.error('Invalid date format:', entry.date);
        return false;
      }
      return entryDate >= startDate && entryDate <= endDate;
    });

    const formattedLabels = filteredData.map(entry => formatDate(entry.date));

    return {
      labels: formattedLabels,
      datasets: [
        {
          data: filteredData.map(entry => entry.systolic),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        },
        {
          data: filteredData.map(entry => entry.diastolic),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        },
      ],
    };
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const renderChart = (days: number) => {
    return (
      <BarChart
        data={prepareChartData(days)}
        width={300}
        height={220}
        yAxisLabel="Systolic: "
        yAxisSuffix=" mmHg"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    );
  };

  const renderItem = ({ item }: { item: BloodPressureEntry }) => (
    <View style={styles.listItem}>
      <Text>Date&Time: {formatDate(item.date)}</Text>
      <Text>Systolic: {item.systolic}</Text>
      <Text>Diastolic: {item.diastolic}</Text>
      <Button title='Edit' onPress={() => handleEdit(item)} />
      <Button title='Delete' onPress={() => handleDelete(item.date)} color='red' />
    </View>
  );

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
          <ScrollView style={styles.scrollView}>
            {bloodPressureData.length >= 7 && (
              <>
                <Text style={styles.chartTitle}>Weekly Chart</Text>
                {renderChart(7)}
              </>
            )}
            {bloodPressureData.length >= 30 && (
              <>
                <Text style={styles.chartTitle}>Monthly Chart</Text>
                {renderChart(30)}
              </>
            )}
            <FlatList
              data={bloodPressureData}
              renderItem={renderItem}
              keyExtractor={item => item.date}
            />
          </ScrollView>
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
  },
  scrollView: {
    width: '100%',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default BloodPressureScreen;
