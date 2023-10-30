import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/header/CustomHeader';
import stylescustom from '../../res/stylescustom';
import {ListDataTuvi} from '../../data/ListDataTuvi';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import images from '../../res/images';
import {NavigationProp} from '@react-navigation/native';
export default function Horoscope({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const renderItem = ({item}: {item: HoroscopeType}) => {
    return (
      <View style={styles.view}>
        <Pressable onPress={() => navigation.navigate(item?.navigation)}>
          <Image source={item.img} />
        </Pressable>
        <Text style={styles.txt}>{item?.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.ct}>
      <CustomHeader title="Tử vi" />
      <View style={stylescustom.container}>
        <ImageBackground
          source={images.bg}
          style={styles.ct}
          resizeMode="repeat">
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={ListDataTuvi}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={styles.columnWrapperStyle}
            ListHeaderComponent={() => (
              <View style={styles.view1}>
                <Text style={styles.txt1}>Tử vi dành cho bạn</Text>
              </View>
            )}
          />
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  columnWrapperStyle: {
    width: sizes.width * 0.8,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
  },
  view: {
    width: sizes.width * 0.3,
    alignItems: 'center',
    marginTop: 10,
  },
  txt: {
    textAlign: 'center',
    marginTop: 8,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    color: colors.black,
  },
  ct: {flex: 1},
  view1: {alignItems: 'center', marginTop: 40},
  txt1: {
    fontFamily: fonts.bold,
    fontSize: sizes.width * 0.06,
    color: colors.black,
  },
});
