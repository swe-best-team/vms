import React, { useEffect, useState } from 'react';
import { useDriver } from 'context/DriverProvider'
import { useAuth, useAlert } from 'context'
import { View, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import Option from 'components/Option';
import Screen from 'components/Screen';
import { Text } from 'react-native-paper'

const TasksScreen = () => {
  const { user } = useAuth();
  const { getTasksByDriver } = useDriver()
  const { activateLoading, stopLoading } = useAlert()

  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    activateLoading()
    getTasksByDriver().then(data => {
      console.log('tasks found!')
      setTasks(data)
      stopLoading()
    }).catch(err => {
      console.error(err)
      stopLoading()
    })
  }, [])

  const handleTaskPress = (taskId) => {
    setSelectedTask((prevSelectedTask) =>
      prevSelectedTask === taskId ? null : taskId
    );
  };

  return (
    <Screen>
      <Text style={styles.heading}>{user.name} {user.surname}'s tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={task => task._id}
        renderItem={({ item }) => {
          const date = new Date(item.deadline)
          const prettyDeadline = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          return (
            <Option
              onPress={() => { }}
              style={styles.option}
            >
              <Text style={styles.text}>
                Task from <Text style={styles.span}>{item.provider}</Text>{'\n'}
              </Text>
              <Text style={styles.text}>on <Text style={styles.span}>{item.vehicle}</Text>{'\n'}</Text>
              <Text style={styles.text}>till <Text style={styles.span}>{prettyDeadline}</Text></Text>
            </Option>
          )
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    fontSize: 15
  },
  span: {
    fontWeight: 600
  }
});

export default TasksScreen
