import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../../res/fonts';
import {NavigationProp} from '@react-navigation/native';
export default function CustomHeader({
  title,
  sharp,
  back,
  onBackPress,
}: {
  title: string;
  sharp?: boolean;
  back?: boolean;
  onBackPress?: NavigationProp<Record<string, any>>;
}) {
  return (
    <View style={styles.view}>
      <StatusBar backgroundColor="transparent" barStyle={'light-content'} />
      <SafeAreaView>
        <View>
          {back && (
            <Ionicons
              onPress={() => onBackPress?.goBack()}
              name="caret-back-outline"
              size={30}
              color={colors.white}
              style={styles.back}
            />
          )}
          <Text style={styles.txt}>{title}</Text>
          {sharp && (
            <Ionicons
              name="funnel-sharp"
              color={colors.white}
              size={29}
              style={styles.sharp}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: sizes.height * 0.15,
    width: sizes.width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorapp,
  },
  txt: {
    color: colors.white,
    textTransform: 'uppercase',
    width: sizes.width,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.05,
  },
  back: {
    position: 'absolute',
    left: 10,
    justifyContent: 'center',
    zIndex: 100,
  },
  sharp: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
  },
});
