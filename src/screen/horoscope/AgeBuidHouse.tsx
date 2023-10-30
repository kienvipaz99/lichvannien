import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React, {useState} from 'react';
import HTML from 'react-native-render-html';
import sizes from '../../res/sizes';
import axios from 'axios';
import {APITuoiXaynha} from '../../res/callapi/Api';
import CustomHeader from '../../components/header/CustomHeader';
import stylescustom from '../../res/stylescustom';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import ModalPickerTime from '../../components/modal/ModalPickerTime';
import {htmltuvithang, vankhan} from '../../res/converts';
import Loading from '../../components/loading/Loading';
import {NavigationProp} from '@react-navigation/native';
import images from '../../res/images';
import TextInputYear from '../../components/textinput/TextInputYear';

export default function AgeBuidHouse({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const [data, setData] = useState('');
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [ngaysinh, setNgaySinh] = useState('');

  const [yearView, setYearView] = useState('');
  const callData = async () => {
    setLoading(true);
    try {
      const aa = await axios.post(`${APITuoiXaynha}`, {
        dateOfBirth: `${ngaysinh}`,
        yearView: yearView,
      });
      setData(aa.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader title="Xem tuổi làm nhà" back onBackPress={navigation} />
      <View style={stylescustom.container}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.view1}>
            <View style={stylescustom.row2}>
              <View style={styles.view}>
                <Text style={styles.txt}>Ngày sinh (Dương lịch)</Text>
                <Pressable onPress={() => setShow(true)} style={styles.btn}>
                  <Text style={styles.txt}>
                    {ngaysinh ? ngaysinh : 'Chọn ngày sinh'}
                  </Text>
                </Pressable>
              </View>
              <View style={styles.view}>
                <Text style={styles.txt}>Năm xem</Text>
                <TextInputYear
                  style={styles.txtip}
                  text={yearView}
                  onChangText={setYearView}
                  keyboardType="numeric"
                  options={{placeholder: 'Năm'}}
                />
              </View>
            </View>
            <Pressable style={styles.view2} onPress={callData}>
              <Text style={styles.txt2}>Tra cứu</Text>
            </Pressable>
            <View style={styles.view3}>
              <HTML
                source={{
                  html: `<div style="color:black;">${vankhan(data)}</div>`,
                }}
                contentWidth={sizes.width}
              />
              <Image source={images.xemtuoixaynha} style={styles.img} />
              <Text style={styles.txt1}>Tra cứu tử vi xem tuổi làm nhà</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <ModalPickerTime
        show={show}
        setShow={() => setShow(false)}
        setTime={setNgaySinh}
      />
      {loading && <Loading />}
    </View>
  );
}
const styles = StyleSheet.create({
  txt: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
  },
  view: {alignItems: 'center'},
  view1: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 30,
  },
  txtip: {width: sizes.width * 0.2, textAlign: 'center'},
  view2: {
    padding: 10,
    backgroundColor: colors.colorapp,
    width: sizes.width * 0.3,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: colors.gray,
    height: sizes.width * 0.11,
    width: sizes.width * 0.5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: sizes.width * 0.7,
    height: sizes.width * 0.7,
    alignSelf: 'center',
  },
  txt1: {
    color: colors.blue1,
    fontSize: sizes.width * 0.05,
    fontFamily: fonts.boldItalic,
    textAlign: 'center',
    marginTop: 10,
  },
  view3: {marginTop: 30, paddingBottom: sizes.height * 0.08},
  txt2: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: sizes.width * 0.045,
  },
});
