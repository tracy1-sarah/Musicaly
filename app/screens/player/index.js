import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import Screen from "../../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../colors/colors";
import Slider from "@react-native-community/slider";
import PlayerButton from "../../components/PlayerButton";
import { AudioContext } from "../../context/AudioProvider";

const {width} = Dimensions.get('window')

export default function Player() {
  const context = useContext(AudioContext)
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>{`${context.currentAudio + 1}/ ${
          context.totalAudioCount
        }`}</Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={300}
            color={colors.ACTIVE_BG}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            Musicc
          </Text>
          <Slider
            style={{ width: width, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={colors.TEXT_FONT}
            maximumTrackTintColor={colors.ACTIVE_BG}
          />
          <View style={stylesAudio.audioControllers}>
            <PlayerButton iconType="PREVIOUS" />
            <PlayerButton
              onPress={() => console.log("playing")}
              style={{ marginHorizontal: 25 }}
              iconType="PLAY"
            />
            <PlayerButton iconType="NEXT" />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const stylesAudio = StyleSheet.create({
  audioControllers: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:20
  }
})
