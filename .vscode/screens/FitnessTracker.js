import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HealthConnect from 'react-native-health-connect';

const FitnessTracker = () => {
  const [healthData, setHealthData] = useState({
    steps: 0,
    calories: 0,
    macros: {
      protein: 0,
      carbs: 0,
      fats: 0,
    },
  });

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const steps = await HealthConnect.getSteps();
      const calories = await HealthConnect.getCalories();
      const macros = await HealthConnect.getNutrition();
      
      setHealthData({
        steps,
        calories,
        macros,
      });
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Tracking</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Steps: {healthData.steps}</Text>
        <Text style={styles.stat}>Calories: {healthData.calories}</Text>
        
        <Text style={styles.subTitle}>Macros</Text>
        <Text style={styles.stat}>Protein: {healthData.macros.protein}g</Text>
        <Text style={styles.stat}>Carbs: {healthData.macros.carbs}g</Text>
        <Text style={styles.stat}>Fats: {healthData.macros.fats}g</Text>
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
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  statsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  stat: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default FitnessTracker;
