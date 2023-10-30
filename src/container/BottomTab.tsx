import {StyleSheet, Text, Platform, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import sizes from '../res/sizes';
import {NavigationProp} from '@react-navigation/native';
import Weather from '../screen/weather/Weather';
import {colors} from '../res/colors';
import images from '../res/images';
import Calendar from '../screen/calendar/Calendar';
import CalendarMonth from '../screen/calendar/CalendarMonth';
import Horoscope from '../screen/horoscope/Horoscope';
import PrayerText from '../screen/prayertext/PrayerText';
import {fonts} from '../res/fonts';
const Tab = createBottomTabNavigator();
interface Props {
  navigation: NavigationProp<Record<string, any>>;
}
const isAndroid = Platform.OS === 'android';

const Bottomtabbars = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.item1,
        tabBarItemStyle: {height: 70, width: sizes.width},
      }}>
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <View style={styles.item}>
                <Image
                  source={images.calendarday}
                  style={[
                    styles.img,
                    {tintColor: focused ? colors.orange : colors.gray1},
                  ]}
                />
                <Text
                  style={[
                    styles.txt,
                    {color: focused ? colors.orange : colors.gray1},
                  ]}>
                  Lịch ngày
                </Text>
              </View>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CalendarMonth"
        component={CalendarMonth}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <View style={styles.item}>
                <Image
                  source={images.calendar}
                  style={[
                    styles.img,
                    {tintColor: focused ? colors.orange : colors.gray1},
                  ]}
                />
                <Text
                  style={[
                    styles.txt,
                    {color: focused ? colors.orange : colors.gray1},
                  ]}>
                  Lịch tháng
                </Text>
              </View>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Thời tiết"
        component={Weather}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <View style={styles.item}>
                <Image
                  source={images.weather}
                  style={[
                    styles.img,
                    {tintColor: focused ? colors.orange : colors.gray1},
                  ]}
                />
                <Text
                  style={[
                    styles.txt,
                    {color: focused ? colors.orange : colors.gray1},
                  ]}>
                  Thời tiết
                </Text>
              </View>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Horoscope"
        component={Horoscope}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <View style={styles.item}>
                <Image
                  source={images.horoscope}
                  style={[
                    styles.img,
                    {tintColor: focused ? colors.orange : colors.gray1},
                  ]}
                />
                <Text
                  style={[
                    styles.txt,
                    {color: focused ? colors.orange : colors.gray1},
                  ]}>
                  Tử vi
                </Text>
              </View>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PrayerText"
        component={PrayerText}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <View style={styles.item}>
                <Image
                  source={images.menu}
                  style={[
                    styles.img,
                    {tintColor: focused ? colors.orange : colors.gray1},
                  ]}
                />
                <Text
                  style={[
                    styles.txt,
                    {color: focused ? colors.orange : colors.gray1},
                  ]}>
                  Văn khấn
                </Text>
              </View>
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottomtabbars;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  item: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item1: {
    height: 70,
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'center',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  txt: {
    fontSize: sizes.width * 0.04,
    fontFamily: fonts.regular,
  },
  img: {
    tintColor: colors.white,
    height: 35,
    width: 35,
  },
});
