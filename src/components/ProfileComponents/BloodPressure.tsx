import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet  } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';

const BloodPressureScreen = () => {


  return (
    <Text>Blood Pressure Screen</Text>
    );
};


const styles = StyleSheet.create({
 
});

export default BloodPressureScreen;
