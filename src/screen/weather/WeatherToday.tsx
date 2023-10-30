import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ApiWeather, ApiWeatherToday, KEYWeather} from '../../api/APIWeather';
import {fullday1, times} from '../../res/converts';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';

const WeatherToday = ({
  location,
}: {
  location: {
    long: number;
    lat: number;
  };
}) => {
  const [data, setData] = useState<Weathers>();
  useEffect(() => {
    const callApi = async () => {
      await axios
        .get(
          `${ApiWeatherToday}?appid=${KEYWeather}&lang=vi&units=metric&lon=${location?.long}&lat=${location?.lat}&cnt=8`,
        )
        .then(response => {
          setData(response.data);
        });
    };
    callApi();
  }, [location]);
  const RenderItem = ({item}: {item: List}) => {
    const urlImgdefault = `http://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`;
    return (
      <View style={styles.view}>
        <Text style={styles.txt1}>{fullday1(item?.dt)}</Text>
        <Text style={styles.txt1}>{times(item?.dt)}</Text>
        <Image source={{uri: urlImgdefault}} style={styles.img} />
        <Text style={styles.txt2}>{item?.weather[0]?.description}</Text>
        <Text style={styles.txt2}>
          {item?.main?.temp_min.toFixed(0)}-{item?.main?.temp_max.toFixed(0)}°c
        </Text>
        <Text style={styles.txt2}>Độ ẩm {item?.main?.humidity}%</Text>
      </View>
    );
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data?.list}
      renderItem={({item}: {item: List}) => <RenderItem item={item} />}
      horizontal
      style={{width: sizes.width * 0.9, marginTop: 20, marginBottom: 40}}
    />
  );
};

export default WeatherToday;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
  },
  view: {
    width: (sizes.width * 0.9) / 4,
    alignItems: 'center',
  },
  txt1: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 18,
  },
  txt2: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 15,
    marginTop: 5,
  },
});
