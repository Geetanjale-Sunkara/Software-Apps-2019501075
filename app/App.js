import React from "react";

import {
  SafeAreaView,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  ImageBackground
} from "react-native";

let id = 0;

const Todo = props => (
  <SafeAreaView style={styles.container}>
    <Text style={[styles.text]}>{props.todo.text}</Text>
    <Button onPress={props.onDelete} title="delete" color="black" />
  </SafeAreaView>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      task: "",
      todos: []
    };
  }

  handleText = text => {
    this.setState({ task: text });
  };

  addTodo() {
    if (this.state.task != "") {
      id++;
      const text = this.state.task;
      this.setState({
        todos: [...this.state.todos, { id: id, text: text, checked: false }]
      });
    }
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    return (
      <ImageBackground source={require("./todo.jpg")} style={styles.image}>
        <SafeAreaView style={[styles.part]}>
          <SafeAreaView style={styles.container}>
            <SafeAreaView style={[styles.textinput]}>
              <TextInput
                placeholder="ToDo Activity..."
                onChangeText={this.handleText}
              />
            </SafeAreaView>

            <SafeAreaView style={[styles.button]}>
              <Button
                color="black"
                onPress={() => this.addTodo()}
                title="Add"
              />
            </SafeAreaView>
          </SafeAreaView>
          <ScrollView style={styles.part}>
            {this.state.todos.map(todo => (
              <Todo onDelete={() => this.removeTodo(todo.id)} todo={todo} />
            ))}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // SafeAreaView: {
  //   padding: 10,
  //   alignItems: "center"
  // },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  part: {
    flex: 1,
    padding: 40
  },
  button: {
    width: "25%",
    padding: 10
  },
  textinput: {
    padding: 10,
    borderColor: "black",
    borderWidth: 2,

    width: "75%"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    padding: 7
  }
});
