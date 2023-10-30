import {StyleSheet} from 'react-native';
import sizes from './sizes';
export default stylescustom = StyleSheet.create({
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadowitem: {
    shadowColor: '#000',

    shadowOpacity: 0.25,
    elevation: 5,
    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: sizes.height * 0.12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
