import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../colors/colors";

const getThumbnailText = (filename) => {
  return filename[0];
};

const convertTime = (minutes) => {
  if (minutes) {
    const hours = minutes / 60;
    const minute = hours.toString().split(".")[0];
    const percent = parseInt(hours.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }
    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }
    if (sec < 10) {
      return `${minute}:0${sec}`;
    }
    return `${minute} : ${sec}`;
  }
};

const renderPlayPauseIcon = (isPlaying) => {
  if (isPlaying)
    return <Entypo name="controller-paus" size={24} color={colors.ACTIVE_FONT} />;
  return <Entypo name="controller-play" size={24} color={colors.ACTIVE_FONT} />;
};
export default function AudioListItem({
  title,
  duration,
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}) {
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
          <View style={styles.leftContainer}>
            <View style={[styles.thumbnail,{backgroundColor:activeListItem ? colors.ACTIVE_BG : colors.FONT_LIGHT }]}>
              <Text style={styles.thumbnailText}>
                {activeListItem
                  ? renderPlayPauseIcon(isPlaying)
                  : getThumbnailText(title)}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text style={styles.timeText}>{convertTime(duration)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <Entypo5
            onPress={onOptionPress}
            name="dots-three-vertical"
            size={20}
            color={colors.FONT_MEDIUM}
          />
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    width: width - 80,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: colors.FONT_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.FONT,
  },
  titleContainer: {
    wdith: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: colors.APP_BG,
  },
  separator: {
    width: width - 80,
    backgroundColor: "#333",
    opacity: 0.3,
    height: 0.5,
    alignSelf: "center",
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: colors.FONT_LIGHT,
  },
});
