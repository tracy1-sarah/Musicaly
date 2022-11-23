import { Dimensions } from "react-native";
import React, { Component } from "react";
import { styles } from "./styles";
import { AudioContext } from "../../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../colors/colors";
import AudioListItem from "../../components/AudioListItem";
import Screen from "../../components/Screen";
import OptionModal from "../../components/OptionModal";
import { Audio, Video } from "expo-av";
import { pause, play, resume, playNext } from "../../colors/audioController";

// const WIDTH = Dimensions.get("window").width;

export class AudioList extends Component {
  static contextType = AudioContext;
  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = async (audio) => {
    const { soundObj, playbackObj, currentAudio, updateState, audioFiles } = this.context;
    //play audio
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio)
      return updateState(this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
        isPlaying: true, 
        currentAudioIndex : index
      });
    }
    //pause the audio
    if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await pause(playbackObj);
      return updateState(this.context, { soundObj: status, isPlaying: false });
    }

    //resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(this.state.playbackObj);
      return updateState(this.context, { soundObj: status, isPlaying: true });
    }

    //select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);
            const index = audioFiles.indexOf(audio)

      return updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index
      });
    }
  };
  rowRenderer = (type, item, index, extendedState) => {
    return (
      <AudioListItem
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
      />
    );
  };
  render() {
    return (
      <LinearGradient
        style={styles.linear}
        colors={Colors.gradient}
        start={{
          x: 0.2,
          y: 0.2,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        <AudioContext.Consumer>
          {({ dataProvider, isPlaying}) => {
            return (
              <Screen>
                <RecyclerListView
                  style={{ flex: 1 }}
                  dataProvider={dataProvider}
                  layoutProvider={this.layoutProvider}
                  rowRenderer={this.rowRenderer}
                  extendedState={{isPlaying}}
                />
                <OptionModal
                  currentItem={this.currentItem}
                  visible={this.state.optionModalVisible}
                  onClose={() => {
                    this.setState({ ...this.state, optionModalVisible: false });
                  }}
                />
              </Screen>
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
