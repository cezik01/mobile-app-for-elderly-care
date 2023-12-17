import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

type HealthMetric = 'Normal' | 'High' | 'Low';

interface HealthMetricItemProps {
  icon: ImageSourcePropType;
  label: string;
  value: HealthMetric;
  color: string;
}

const HealthMetricItem: React.FC<HealthMetricItemProps> = ({ icon, label, value, color }) => (
  <View style={styles.metricItem}>
    <Text style={[styles.metricLabel, { color }]}>{label}</Text>
    <Image source={icon} style={styles.icon} />
    <Text style={[styles.metricValue, { color }]}>{value}</Text>
  </View>
);

interface HealthMetricsProps {
  bloodPressure: HealthMetric;
  bloodSugar: HealthMetric;
}

const HealthMetrics: React.FC<HealthMetricsProps> = ({ bloodPressure, bloodSugar }) => {
  const getHealthMetricColor = (metric: HealthMetric): string => {
    switch (metric) {
      case 'Normal':
        return 'green';
      case 'High':
        return 'red';
      case 'Low':
        return 'blue';
      default:
        return 'black';
    }
  };

  return (
    <View style={styles.metricsContainer}>
      <HealthMetricItem
        icon={require('../../../assets/profiles/Graph.png')}
        label="Blood Pressure"
        value={bloodPressure}
        color={getHealthMetricColor(bloodPressure)}
      />
      <HealthMetricItem
        icon={require('../../../assets/profiles/Group.png')}
        label="Blood Sugar"
        value={bloodSugar}
        color={getHealthMetricColor(bloodSugar)}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 50,
  },
  metricItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {
    width: 130,
    height: 130,
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HealthMetrics;
