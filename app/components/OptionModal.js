import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import colors from "../colors/colors";

const OptionModal = ({ visible, onClose, currentItem }) => {
  const { filename } = currentItem;
  return (
    <>
      <StatusBar hidden />
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            <Text style={styles.option}>Play</Text>
            <Text style={styles.option}>Add to playlist</Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.MODAL,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    padding: 20,
    fontWeight: "bold",
    paddingBottom: 0,
    color: colors.APP_BG,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.APP_BG,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.MODAL_BG,
  },
});
