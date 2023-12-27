import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, FlatList } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { Provider } from 'react-native-paper';
import { validateNumericInput } from 'helpers/validationSchemas/numericInputValidation';
import i18n from 'common/i18n/i18n';
import { BloodSugarEntry } from 'types/BloodSugarEntry';
import { formatDate, parseDate } from 'helpers/date/dateHelper';
import { BarChart } from 'react-native-chart-kit';
import { calculateChartWidth } from 'helpers/chart/chartHelper';

const BloodSugarScreen = () => {
  const [bloodSugar, setBloodSugar] = useState('');
  const [bloodSugarData, setBloodSugarData] = useState<BloodSugarEntry[]>([]);
  const [isBloodSugarValid, setIsBloodSugarValid] = useState(true);
  const [editingEntry, setEditingEntry] = useState<BloodSugarEntry | null>(null);

  const auth = getAuth();
  const database = getDatabase();
  const userId = auth.currentUser?.uid;
  const bsRef = ref(database, 'bloodSugar/' + userId);

  useEffect(() => {
    const unsubscribe = onValue(bsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const formattedData = Object.keys(data).map((key) => ({
        date: key,
        ...data[key]
      }));
      setBloodSugarData(formattedData);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (item: BloodSugarEntry) => {
    setBloodSugar(String(item.level));
    setEditingEntry(item);
  };

  const handleDelete = (date: string) => {
    const deleteRef = ref(database, 'bloodSugar/' + userId + '/' + date);

    remove(deleteRef).then(() => {
      const updatedData = bloodSugarData.filter(entry => entry.date !== date);
      setBloodSugarData(updatedData);
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const handleSubmit = () => {
    if (!bloodSugar) {
      Alert.alert('Error', 'Blood sugar value is required.');
      return;
    }

    const newEntry = {
      level: parseInt(bloodSugar, 10),
    };

    const entryRef = editingEntry
      ? ref(database, 'bloodSugar/' + userId + '/' + editingEntry.date)
      : ref(database, 'bloodSugar/' + userId + '/' + Date.now());

    update(entryRef, newEntry).then(() => {
      setEditingEntry(null);
      setBloodSugar('');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const renderItem = ({ item }: { item: BloodSugarEntry }) => (
    <View style={styles.listItem}>
      <Text>{i18n.t('DateWithTime')}: {formatDate(item.date)}</Text>
      <Text>{i18n.t('BloodSugar')}: {item.level}</Text>
      <Button title='Edit' onPress={() => handleEdit(item)} />
      <Button title='Delete' onPress={() => handleDelete(item.date)} color='red' />
    </View>
  );

  const prepareChartData = (days: number) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const endDate = new Date();

    const filteredData = bloodSugarData.filter(entry => {
      const entryDate = parseDate(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });

    return {
      labels: filteredData.map(entry => formatDate(entry.date)),
      datasets: [
        {
          data: filteredData.map(entry => entry.level),
          color: (opacity = 1) => `rgba(133, 105, 241, ${opacity})`, // Example color
        },
      ],
    };
  };

  const renderChart = (days: number) => {
    const data = prepareChartData(days);
    const chartWidth = calculateChartWidth(data.labels.length);

    return (
      <BarChart
        data={data}
        width={chartWidth}
        height={250}
        xAxisLabel=''
        yAxisLabel=''
        yAxisSuffix=''
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: 'lightgrey',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={30}
      />
    );
  }

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          placeholder='Enter Blood Sugar Level'
          value={bloodSugar}
          onChangeText={(text) => {
            const { validText, isValid } = validateNumericInput(text);
            setBloodSugar(validText);
            setIsBloodSugarValid(isValid);
          }}
          style={styles.input}
        />
        {!isBloodSugarValid && (
          <Text style={styles.warningText}>{i18n.t('EnterValidNumber')}</Text>
        )}
        <Button title='Submit' onPress={handleSubmit} />
        {bloodSugarData.length > 0 && (
          <>
            {bloodSugarData.length == 7 && (
              <>
                <Text style={styles.chartTitle}>Weekly Chart</Text>
                {renderChart(7)}
              </>
            )}
            {bloodSugarData.length == 30 && (
              <>
                <Text style={styles.chartTitle}>Monthly Chart</Text>
                {renderChart(30)}
              </>
            )}
            <FlatList
              data={bloodSugarData}
              renderItem={renderItem}
              keyExtractor={item => item.date}
            />
          </>
        )}
      </View>
    </Provider>
  );

};

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
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
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6495ED',
  },
});

export default BloodSugarScreen;
