import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      listOfItems: [],
    };
  }

  deleteItem(id) {
    const list = this.state.listOfItems;
    const updatedList = list.filter((item) => item.id !== id);
    this.setState({
      listOfItems: updatedList,
    });
  }
  updateInput(key, value) {
    // update react state
    this.setState({
      [key]: value,
    });
  }
  addItem = () => {
    if (this.state.newItem != "") {
      // create a new item with unique id
      const newItemJSON = {
        id: 1 + Math.random(),
        value: this.state.newItem.slice(),
      };

      // copy current list of items
      const list = this.state.listOfItems;

      // add the new item to the list
      list.push(newItemJSON);

      // update state with new list, reset the new item input
      this.setState({
        listOfItems: list,
        //listOfItems:[...this.state.listOfItems,list],
        newItem: "",
      });
    }
  };
  editItem(id) {
    const list = this.state.listOfItems;
    const editValue = list.filter((item) => item.id === id);
    this.setState({
      newItem: editValue[0].value,
    });

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>To Do List</Text>
        </View>
        <View>
          <TextInput
            placeholder="  Type item here..."
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ newItem: text });
            }}
            value={this.state.newItem}
          ></TextInput>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.addItem}>
              <Text style={styles.buttontext}>+</Text>
            </TouchableOpacity>
          </View>

          <View>
            <ScrollView>
              {this.state.listOfItems.map((item) => {
                return (
                  <View key={item.id} style={styles.listview}>
                    <TextInput style={styles.textstyle} value={item.value} />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => this.deleteItem(item.id)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => this.editItem(item.id)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48AAAD",
  },
  textView: {
    backgroundColor: "#ff0066",
    height: 80,
  },
  text: {
    textAlign: "center",
    marginTop: "10%",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 20,
    height: 40,
  },
  button: {
    position: "absolute",
    right: 20,
    top: 200,
    backgroundColor: "maroon",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },

  buttontext: {
    color: "#fff",
    fontSize: 24,
  },
  textstyle: {
    fontSize: 20,
    color: "maroon",
  },
  listview: {
    borderWidth: 2,
    height: 40,
    justifyContent: "space-between",
    borderColor: "maroon",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  deleteButtonText: {
    color: "white",
  },
  editButton: {
    backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  editButtonText: {
    color: "white",
  },
});