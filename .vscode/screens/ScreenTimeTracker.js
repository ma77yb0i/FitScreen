import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenTimeTracker = () => {
  const [appUsage, setAppUsage] = useState({});
  const [limits, setLimits] = useState({});

  useEffect(() => {
    
    loadData();
    
    startTracking();
  }, []);

  const loadData = async () => {
    const savedUsage = await AsyncStorage.getItem('appUsage');
    const savedLimits = await AsyncStorage.getItem('appLimits');
    if (savedUsage) setAppUsage(JSON.parse(savedUsage));
    if (savedLimits) setLimits(JSON.parse(savedLimits));
  };

  const startTracking = () => {
    
    setInterval(async () => {
      
      const currentApp = await currentApp();
      updateAppUsage(currentApp);
    }, 60000);
  };

  const updateAppUsage = (appName) => {
    setAppUsage(prev => ({
      ...prev,
      [appName]: (prev[appName] || 0) + 1
    }));
  };

  const { NativeModules } = require('react-native');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen Time Dashboard</Text>
      <FlatList
        data={Object.entries(appUsage)}
        renderItem={({ item }) => (
          <View style={styles.appItem}>
            <Text>{item[0]}</Text>
            <Text>{Math.round(item[1] / 60)} hours</Text>
          </View>
        )}
      />
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
  appItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default ScreenTimeTracker;
