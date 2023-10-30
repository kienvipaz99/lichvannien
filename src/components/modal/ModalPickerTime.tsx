import {StyleSheet} from 'react-native';
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {convertDay} from '../../res/converts';

export default function ModalPickerTime({
  show,
  setTime,
  setShow,
}: {
  show: boolean;
  setTime: (val: string) => void;
  setShow: (val: boolean) => void;
}) {
  return (
    <>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={(date: Date) => {
          setTime(convertDay(date));
          setShow(false);
        }}
        onCancel={() => setShow(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({});
