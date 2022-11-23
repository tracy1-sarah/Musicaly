import { StyleSheet } from "react-native";
import colors from "../../colors/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  audioCount: {
    textAlign: "right",
    padding: 15,
    color: colors.FONT_LIGHT,
    fontSize: 14,
  },

  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    audioTitle: {
        fontSize: 16,
        color: colors.FONT,
        padding:15
      
  }
});