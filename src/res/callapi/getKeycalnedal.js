import axios from 'axios';

export const config = {
  headers: {
    Cookie: '_zlang=vn',
  },
};
export const getKeycalnedal = async () => {
  let data = '';
  let err = {};

  try {
    const response = await axios.get(
      'https://baomoi.com/tien-ich/lich-van-nien.epi',
      config,
    );
    const rawData = response.data;

    const startIndex = rawData.indexOf('"buildId":"');
    if (startIndex !== -1) {
      const endIndex = rawData.indexOf('"', startIndex + '"buildId":"'.length);
      if (endIndex !== -1) {
        const buildId = rawData.slice(
          startIndex + '"buildId":"'.length,
          endIndex,
        );
        data = buildId;
      }
    }
  } catch (error) {
    err = error;
  }

  return {data, err};
};
