import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { Button } from 'react-native-paper';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { Provider } from 'react-native-paper';
import { validateNumericInput } from 'helpers/validationSchemas/numericInputValidation';
import i18n from 'common/i18n/i18n';
import BloodPressureEntry from 'types/BloodPressureEntry';
import { BarChart } from 'react-native-chart-kit';
import { formatDate, parseDate } from 'helpers/date/dateHelper';
import { calculateChartWidth } from 'helpers/chart/chartHelper';
import { MaterialIcons } from '@expo/vector-icons';
import { BloodEntryProps } from 'types/BloodEntryProps';

const BloodPressureScreen = ({ navigation }: BloodEntryProps) => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureEntry[]>([]);
  const [isSystolicValid, setIsSystolicValid] = useState(true);
  const [isDiastolicValid, setIsDiastolicValid] = useState(true);
  const [editingEntry, setEditingEntry] = useState<BloodPressureEntry | null>(null);

  const auth = getAuth();
  const database = getDatabase();
  const userId = auth.currentUser?.uid;
  const bpRef = ref(database, 'bloodPressure/' + userId);

  useEffect(() => {
    const unsubscribe = onValue(bpRef, (snapshot) => {
      const data = snapshot.val() || {};
      const formattedData = Object.keys(data).map((key) => ({
        date: key,
        ...data[key]
      }));
      setBloodPressureData(formattedData);
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
      return entryDate >= startDate && entryDate <= endDate;
    });

    const formattedLabels = filteredData.map(entry => `${entry.diastolic}`);

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
  };

  const renderItem = ({ item }: { item: BloodPressureEntry }) => (
    <View style={styles.listItem}>
      <Text>{i18n.t('DateWithTime')}: {formatDate(item.date)}</Text>
      <Text>{i18n.t('Systolic')}: {item.systolic}</Text>
      <Text>{i18n.t('Diastolic')}: {item.diastolic}</Text>
      <Button onPress={() => handleEdit(item)} labelStyle={styles.buttonText}>{i18n.t('Edit')}</Button>
      <Button onPress={() => handleDelete(item.date)} labelStyle={styles.buttonText} textColor='red'>{i18n.t('Delete')}</Button>
    </View>
  );

  const handleHelpPress = () => {
    navigation.navigate('Help Screen')
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
        <Button onPress={handleSubmit} labelStyle={styles.buttonText}>{i18n.t('Submit')}</Button>
        {bloodPressureData.length > 0 && (
          <>
            {bloodPressureData.length == 7 && (
              <>
                <Text style={styles.chartTitle}>{i18n.t('WeeklyChart')}</Text>
                {renderChart(7)}
              </>
            )}
            {bloodPressureData.length == 30 && (
              <>
                <Text style={styles.chartTitle}>{i18n.t('MonthlyChart')}</Text>
                {renderChart(30)}
              </>
            )}
            <FlatList
              data={bloodPressureData}
              renderItem={renderItem}
              keyExtractor={item => item.date}
            />
          </>
        )}
        <TouchableOpacity onPress={handleHelpPress}
        >
          <View style={styles.questionMarkContainer}>
            <MaterialIcons name='help' style={styles.questionMarkIcon} size={25} />
            <Text style={styles.helpText}>
              {i18n.t('Help')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 16,
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
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  questionMarkIcon: {
    color: 'blue',
    marginRight: 5,
    marginBottom: 15,
  },
  questionMarkContainer: {
    flexDirection: 'row',
    marginTop: '20%',
    marginLeft: 5,
  },
  helpText: {
    fontSize: 20,
    color: 'blue',
  },
});

export default BloodPressureScreen;
