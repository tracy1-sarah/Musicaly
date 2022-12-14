import React, { Component, createContext } from "react";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { DataProvider } from "recyclerlistview";

export const AudioContext = createContext();
export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
    };
    this.totalAudioCount = 0;
  }

  //Permission alert
  permissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "Musicaly needs permission to access your audio files",
      [
        {
          text: "Allow access",
          // grant permission
          onPress: () => this.getPermission(),
        },
        {
          text: "Cancel",
          // display alert again
          onPress: () => this.permissionAlert(),
        },
      ]
    );
  };

  // Get audio files from user
  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "video",
    });

    media = await MediaLibrary.getAssetsAsync({
      mediaType: "video",
      first: media.totalCount,
    });
    this.totalAudioCount = media.totalCount;

    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    });
  };

  getPermission = async () => {
    //  {
    //   "accessPrivileges": "none",
    //   "canAskAgain": true,
    //   "expires": "never",
    //   "granted": false,
    //   "status": "undetermined",
    // }

    //   check for permission status
    const permission = await MediaLibrary.getPermissionsAsync();

    //   if permission has been granted
    if (permission.granted) {
      // read all audio files
      this.getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      this.setState({ ...this.state, permissionError: true });
    }

    // if permission has not been granted and permission can be asked again
    if (!permission.granted && permission.canAskAgain) {
      //   request permission(gives a popup for user to allow or deny permission)
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      // if status is denied and can be asked again
      if (status === "denied" && canAskAgain) {
        // then display an alert for user to allow permission to use the app
        this.permissionAlert();
      }
      // if permission has been granted
      if (status === "granted") {
        // then get all media files
        this.getAudioFiles();
      }

      // if status has been denied and can not ask again is false
      if (status === "denied" && !canAskAgain) {
        // then display an error msg
        this.setState({ ...this.state, permissionError: true });
      }
    }
  };

  componentDidMount() {
    this.getPermission();
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };
  render() {
    //destructure audio files
    const {
      audioFiles,
      dataProvider,
      permissionError,
      playbackObj,
      soundObj,
      currentAudio,
      isPlaying,
      currentAudioIndex
    } = this.state;

    if (permissionError) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              alignItems: "center",
              color: "red",
            }}
          >
            It seems you haven't granted this app the permission
          </Text>
        </View>
      );
    }
    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          dataProvider,
          playbackObj,
          soundObj,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          updateState: this.updateState,
          totalAudioCount: this.totalAudioCount,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
