import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';

export default function TextInputYear({
  keyboardType,
  style,
  text,
  onChangText,
  inputRef,
  options,
}: {
  keyboardType?: KeyboardTypeOptions;
  style?: StyleProp<TextStyle>;
  text?: string;
  onChangText?: (val: string) => void;
  inputRef?: any;
  options?: TextInputProps;
}) {
  return (
    <TextInput
      ref={inputRef}
      style={[styles.txtInput, style]}
      keyboardType={keyboardType}
      value={text}
      maxLength={4}
      cursorColor={colors.black}
      selectionColor={colors.black}
      blurOnSubmit={false}
      onChangeText={onChangText}
      {...options}
    />
  );
}

const styles = StyleSheet.create({
  txtInput: {
    width: sizes.width * 0.55,
    height: sizes.width * 0.11,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: colors.gray,
  },
});
