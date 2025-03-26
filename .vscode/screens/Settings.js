import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [appLimits, setAppLimits] = useState({});
  const [newApp, setNewApp] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const saveLimit = async () => {
    if (newApp && newLimit) {
      const updatedLimits = {
        ...appLimits,
        [newApp]: parseInt(newLimit),
      };
      setAppLimits(updatedLimits);
      await AsyncStorage.setItem('appLimits', JSON.stringify(updatedLimits));
      setNewApp('');
      setNewLimit('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Limits</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="App Name"
          value={newApp}
          onChangeText={setNewApp}
        />
        <TextInput
          style={styles.input}
          placeholder="Daily Limit (minutes)"
          value={newLimit}
          onChangeText={setNewLimit}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={saveLimit}>
          <Text style={styles.buttonText}>Set Limit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Settings;
