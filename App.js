import React, {useRef, useState} from 'react';
import {Text, Switch, ScrollView, StyleSheet, TextInput, View} from 'react-native';

export default function App() {
  const [uncontrolledList, setUncontrolledList] = useState([])
  const [controlledList, setControlledList] = useState([])
  const [controlledInputValue, setControlledInputValue] = useState("")
  const [multiline, setMultiline] = useState(true)
  const [timer, setTimer] = useState(false)
  const toggleMultiline = () => setMultiline(multiline => !multiline);
  const toggleTimer = () => setTimer(timer => !timer);
  const inputControlled = useRef()
  const inputUncontrolled = useRef()
  console.log('controlledList', controlledList)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttons}>
        <View  style={styles.button}>
          <Text>Multiline:</Text>
          <Switch
            onValueChange={toggleMultiline}
            value={multiline}
          />
        </View>
        <View  style={styles.button}>
          <Text>timer hack:</Text>
          <Switch
            onValueChange={toggleTimer}
            value={timer}/>
        </View>
      </View>
      <View style={styles.list}>
        <Text>Uncontrolled:</Text>
        {uncontrolledList.map((text, index) => <Text key={index}>{text}</Text>)}
        <TextInput
          ref={inputUncontrolled}
          style={styles.textInput}
          multiline={multiline}
          onSubmitEditing={(e) => {
            console.log('uncontrolled onSubmitEditing')
            setUncontrolledList([...uncontrolledList, e.nativeEvent.text])
            if (inputUncontrolled.current) {
              if (timer) {
                setTimeout(() => inputUncontrolled.current.clear(), 50)
              }
              inputUncontrolled.current.clear()
            }
          }}
        />
      </View>
      <View style={styles.list}>
        <Text>Controlled:</Text>
        {controlledList.map((text, index) => <Text key={index}>{text}</Text>)}
        <TextInput
          ref={inputControlled}
          style={styles.textInput}
          multiline={multiline}
          blurOnSubmit={false}
          value={controlledInputValue}
          onSubmitEditing={() => {
            console.log('controlled onSubmitEditing')
            setControlledList(controlledList => [...controlledList, controlledInputValue])
            setControlledInputValue("")
            if (inputControlled.current) {
              if (timer) {
                setTimeout(() => inputControlled.current.clear(), 50)
              }
              inputControlled.current.clear()
            }
          }}
          onChangeText={(text) => setControlledInputValue(text)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
  },
  list: {
    padding: 10,
    borderWidth: 2,
    flex: 1,
  },
  textInput: {
    borderWidth: 1
  },
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
});
