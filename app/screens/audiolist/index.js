import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { Component } from "react";
import { styles } from "./styles";
import { AudioContext } from "../../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../colors/colors";


// const WIDTH = Dimensions.get("window").width;

export class AudioList extends Component {
  static contextType = AudioContext;

  layoutProvider = new LayoutProvider(
    (i) => "video",
    (type, dim) => {
      switch (type) {
        case "video":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  rowRenderer = (type, item) => {
    return <Text>{item.filename}</Text>;
  };
  render() {
    return (
      <LinearGradient
        style={styles.linear}
        colors={Colors.gradient}
        start={{
          x: 0.1,
          y: 0.2,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        <AudioContext.Consumer>
          {({ dataProvider }) => {
            return (
              <RecyclerListView
                style={{ flex: 1 }}
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
            );
          }}
        </AudioContext.Consumer>
      </LinearGradient>
      // <ScrollView>
      //   <View >
      //   {this.context.audioFiles.map(item => (
      //     <Text   key={item.id}>{item.filename}</Text>
      //   ))}
      //   </View>
      // </ScrollView>
    );
  }
}

export default AudioList;
