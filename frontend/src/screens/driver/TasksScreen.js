import React, { useEffect, useState } from 'react';
import { useDriver } from 'context/DriverProvider'
import { useAuth, useAlert } from 'context'
import { StyleSheet, FlatList } from 'react-native';
import Option from 'components/Option';
import Screen from 'components/Screen';
import { Text } from 'react-native-paper'

const TasksScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { getTasksByDriver } = useDriver()
  const { activateLoading, stopLoading } = useAlert()

  const [tasks, setTasks] = useState([])


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

  return (
    <Screen>
      <Text variant='titleLarge' style={styles.heading}>{user.name} {user.surname}'s tasks</Text>
      {tasks.length === 0
        ? <Text>No tasks assigned yet</Text>
        :
        <FlatList
          data={tasks}
          keyExtractor={task => task._id}
          renderItem={({ item }) => {
            const date = new Date(item.deadline)
            const prettyDeadline = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            return (
              <Option
                onPress={() => { navigation.navigate('SingleTaskScreen', { task: item }) }}
                style={styles.option}
              >
                <Text style={styles.text}>
                  Task from <Text style={styles.span}>{item.provider}</Text>{'\n'}
                </Text>
                <Text style={styles.text}>on <Text style={styles.span}>{item.vehicle}</Text>{'\n'}</Text>
                <Text style={styles.text}>till <Text style={styles.span}>{prettyDeadline}{'\n'}</Text></Text>
                <Text style={[styles.status, item.completed && completed]}>
                  {item.completed
                    ? 'COMPLETED'
                    : 'INCOMPLETED'
                  }
                </Text>
              </Option>
            )
          }}
        />
      }
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 16,
  },
  option: {
    paddingVertical: 10,
    paddingRight: 10
  },
  text: {
    fontSize: 15
  },
  span: {
    fontWeight: 600
  },
  status: {
    fontWeight: 600,
    color: 'red'
  },
  completed: {
    color: 'green'
  }
});

export default TasksScreen
