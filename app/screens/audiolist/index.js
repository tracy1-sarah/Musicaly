import { View, Text, ScrollView } from "react-native";
import React, { Component } from "react";
import { styles } from "./styles";
import { AudioContext } from "../../context/AudioProvider";

export class AudioList extends Component{
  static contextType = AudioContext
  render() {
    return (
      <ScrollView>
        <View >
        {this.context.audioFiles.map(item => (
          <Text style={styles.title} key={item.id}>{item.filename}</Text>
        ))}  
        </View>
      </ScrollView>
    );
  }
}

export default AudioList;

