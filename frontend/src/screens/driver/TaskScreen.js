import React, { useState } from 'react';
import { useAuth } from 'context'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TaskScreen = () => {
    const { user } = useAuth(); 
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = [
    {
      "_id": "6551f86d49388e365a93d207",
      "provider": "Provider 1",
      "executor": "Executor 1",
      "vehicle": "Vehicle 1",
      "deadline": "2023-11-15T00:00:00.000Z",
      "completed": false,
      "__v": 0
    },
    {
      "_id": "6551fa7c49388e365a93d216",
      "provider": "Provider 2",
      "executor": "Executor 2",
      "vehicle": "Vehicle 2",
      "deadline": "2023-12-01T00:00:00.000Z",
      "completed": false,
      "__v": 0
    },
    {
        "_id": "65536635af86c0519771b4f5",
        "provider": "65299c3d015948459cf0d1c3",
        "executor": "653cca021466eca0e63727d9",
        "vehicle": "6546bad92f69a075e0e93062",
        "deadline": "2023-11-30T00:00:00.000Z",
        "completed": false,
        "__v": 0
    },
    {
        "_id": "65537109af86c0519771b52f",
        "provider": "65299c3d015948459cf0d1c3",
        "executor": "653cca021466eca0e63727d9",
        "vehicle": "6546bad92f69a075e0e93062",
        "deadline": "2023-11-22T00:00:00.000Z",
        "completed": false,
        "__v": 0
    },
    {
        "_id": "655640172c7ecc52b7380781",
        "provider": "65299c3d015948459cf0d1c3",
        "executor": "653cca021466eca0e63727d9",
        "vehicle": "6546bad92f69a075e0e93062",
        "deadline": "2023-11-22T00:00:00.000Z",
        "completed": false,
        "__v": 0
    },
    {
        "_id": "655660be10b89d367c270161",
        "provider": "65299c3d015948459cf0d1c3",
        "executor": "653cca021466eca0e63727d9",
        "vehicle": "6546bad92f69a075e0e93062",
        "deadline": "2023-11-15T00:00:00.000Z",
        "completed": false,
        "__v": 0
    },
    {
        "_id": "65573e3d3c60b33bce40e77d",
        "provider": "65299c3d015948459cf0d1c3",
        "executor": "653cca021466eca0e63727d9",
        "vehicle": "6546bad92f69a075e0e93062",
        "deadline": "2023-12-01T00:00:00.000Z",
        "completed": false,
        "__v": 0
    },
    {
        "_id": "655746297a7aa2ff7633dc8c",
        "provider": "65299c3d015948459cf0d1c3",
        "executor": "653cca021466eca0e63727d9",
        "vehicle": "65437e7dbe568a0fe0ee0b52",
        "deadline": "2023-11-30T00:00:00.000Z",
        "completed": false,
        "__v": 0
    },
    {
        "_id": "6557479f14edf2f13bd95d6a",
        "provider": "65299c3d015948459cf0d1c3",
        "executor": "653cca021466eca0e63727d9",
        "vehicle": "6546bad92f69a075e0e93062",
        "deadline": "2023-11-28T00:00:00.000Z",
        "completed": false,
        "__v": 0
    }
   
  ];

  const handleTaskPress = (taskId) => {
    setSelectedTask((prevSelectedTask) =>
      prevSelectedTask === taskId ? null : taskId
    );
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{user.name} {user.surname}'s tasks</Text>

      {tasks.map((task) => (
        <View key={task._id}>
          <TouchableOpacity
            onPress={() => handleTaskPress(task._id)}
            style={styles.taskButton}
          >
            <Text style={styles.buttonText}>{`Task ${task._id.substring(0, 8)}`}</Text>
          </TouchableOpacity>

          {selectedTask === task._id && (
            <View style={styles.taskDetails}>
              {/* Display information related to the selected task */}
              <Text>{`Task ID: ${task._id}`}</Text>
              <Text>{`Provider: ${task.provider}`}</Text>
              <Text>{`Executor: ${task.executor}`}</Text>
              <Text>{`Vehicle: ${task.vehicle}`}</Text>
              <Text>{`Deadline: ${task.deadline}`}</Text>
              <Text>{`Status: ${task.completed ? 'Completed' : 'Incomplete'}`}</Text>
              
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20, // Adjust the top padding as needed
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  taskButton: {
    backgroundColor: '#8e44ad',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  taskDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
});

export default TaskScreen;
