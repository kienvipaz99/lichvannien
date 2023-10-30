import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HTML from 'react-native-render-html';
import sizes from '../../res/sizes';
import {NavigationProp} from '@react-navigation/native';
import CustomHeader from '../../components/header/CustomHeader';
import stylescustom from '../../res/stylescustom';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';

export default function DetaiPrayerText({
  navigation,
  route,
}: {
  navigation: NavigationProp<Record<string, any>>;
  route: any;
}) {
  const {title, data} = route?.params?.item;
  return (
    <View style={{flex: 1}}>
      <CustomHeader back onBackPress={navigation} title={'Văn khấn'} />
      <View style={stylescustom.container}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.view}>
            <Text style={styles.txt}>{title}</Text>
            <HTML
              source={{
                html: `
                <body style="color: black;">
                ${data}
                </body>
              `,
              }}
              contentWidth={sizes.width * 0.9}
              ignoredDomTags={['o:p']}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    paddingBottom: 50,
  },
  txt: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.055,
    textAlign: 'center',
    marginTop: 20,
  },
});
