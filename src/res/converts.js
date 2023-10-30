export function fullday() {
  let a = new Date();
  let d = a.getDate();
  let mm = String(a.getMonth() + 1);
  let day = d + ' tháng ' + mm;
  return day;
}
export function fullday1(val) {
  let a = new Date(val * 1000);
  let d = a.getDate();
  let mm = String(a.getMonth() + 1);
  let day = d + '/' + mm;
  return day;
}
export function thu() {
  const daysOfWeek = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];
  const thu = new Date().getDay();

  if (thu >= 0 && thu < daysOfWeek.length) {
    return daysOfWeek[thu];
  } else {
    return null;
  }
}
export function times(time) {
  let date = new Date(time * 1000);
  let a = date.getHours();
  let b = date.getMinutes();
  let hour = a < 10 ? '0' + a : a;
  let minute = b < 10 ? '0' + b : b;
  return hour + ':' + minute;
}
const tuDien = {
  MONDAY: 'Thứ Hai',
  TUESDAY: 'Thứ Ba',
  WEDNESDAY: 'Thứ Tư',
  THURSDAY: 'Thứ Năm',
  FRIDAY: 'Thứ Sáu',
  SATURDAY: 'Thứ Bảy',
  SUNDAY: 'Chủ Nhật',
};
export function chuyenDoiNgay(ngayTiengAnh) {
  return tuDien[ngayTiengAnh] || ngayTiengAnh;
}
export const days = () => {
  let curent = new Date();
  let month = curent.getMonth() + 1;
  let year = curent.getFullYear();
  let numberday = new Date(year, month, 0).getDate();
  let week = [];
  for (let i = 1; i <= numberday; i++) {
    let ngay = i;
    let fullday = year + '-' + month + '-' + ngay;
    week.push(fullday);
  }
  return week;
};
export const tachngayam = val => {
  const nam = val?.slice(0, 4);
  const thang = val?.slice(4, 6);
  const ngay = val?.slice(6, 8);
  return {ngay, thang, nam};
};
export function hienThiThongTinMuiGio(data) {
  const gioHienTai = new Date().getHours();
  const gioHienTaiString = gioHienTai.toString() + ':00';

  if (data) {
    let thongTin = data[gioHienTaiString];

    if (!thongTin) {
      let gioTruocDo = gioHienTai - 1;
      if (gioTruocDo < 0) {
        gioTruocDo = 23;
      }
      gioTruocDo = gioTruocDo?.toString() + ':00';
      thongTin = data[gioTruocDo];
    }

    if (thongTin) {
      const mangKetQua = thongTin.split(': ')[1].split(', ')[0];
      return mangKetQua;
    } else {
    }
  }
}
export function giohoangdao(data) {
  const pattern = /Giờ: (.*),/;
  const ketQua = data.match(pattern);

  if (ketQua && ketQua.length > 1) {
    const phanCanLay = ketQua[1]; // Lấy phần cần thiết từ kết quả
    return phanCanLay;
  } else {
    console.log('Không tìm thấy dữ liệu phù hợp.');
  }
}
export function loaiBoHTML(text) {
  return text.replace(/<[^>]+>/g, '');
}
export function tachchuoidoi(val) {
  const mangKetQua = val.split(', ');

  if (mangKetQua.length >= 2) {
    const text1 = mangKetQua[0];
    const text2 = mangKetQua[1];

    return {text1, text2};
  }
}
export function htmltuvithang(data) {
  const htmlProcessed = data
    .replace(/href="[^"]*"/g, '')
    .replace(/color:\s*rgb\(0,\s*0,\s*255\)/g, 'color: black;');
  const khoangCach = htmlProcessed.indexOf('Mời bạn xem thêm tử vi tháng');

  if (khoangCach !== -1) {
    const chuoiCat = htmlProcessed.substring(0, khoangCach);
    return chuoiCat;
  } else {
    return htmlProcessed;
  }
}
export function vankhan(data) {
  const htmlProcessed = data
    .replace(/href="[^"]*"/g, '')
    .replace(/color:\s*rgb\(0,\s*0,\s*255\)/g, 'color: black;');
  const khoangCach = htmlProcessed.indexOf('- Văn khấn');

  if (khoangCach !== -1) {
    const chuoiCat = htmlProcessed.substring(0, khoangCach);
    return chuoiCat;
  } else {
    return htmlProcessed;
  }
}
export function htmltuvitrondoi(data) {
  const htmlProcessed = data
    .replace(/href="[^"]*"/g, '')
    .replace(/color:\s*rgb\(0,\s*0,\s*255\)/g, 'color: black;');

  const khoangCach = htmlProcessed.indexOf(
    'Để có thể tìm hiểu chi tiết vận hạn từng năm về mọi mặt trong cuộc',
  );

  if (khoangCach !== -1) {
    const chuoiCat = htmlProcessed.substring(0, khoangCach);
    return chuoiCat;
  } else {
    return htmlProcessed;
  }
}
export function vanhanhnam(data) {
  const htmlProcessed = data
    .replace(/href="[^"]*"/g, '')
    .replace(/color:\s*rgb\(0,\s*0,\s*255\)/g, 'color: black;');

  const khoangCach = htmlProcessed.indexOf(
    'Dưới đây là Bảng tra cứu Tử vi năm',
  );

  if (khoangCach !== -1) {
    const chuoiCat = htmlProcessed.substring(0, khoangCach);
    return chuoiCat;
  } else {
    return htmlProcessed;
  }
}
export function saogiaihan(data) {
  const htmlProcessed = data
    .replace(/href="[^"]*"/g, '')
    .replace(/color:\s*rgb\(0,\s*0,\s*255\)/g, 'color: black;');

  const khoangCach = htmlProcessed.indexOf('Các bài viết liên quan');

  if (khoangCach !== -1) {
    const chuoiCat = htmlProcessed.substring(0, khoangCach);
    return chuoiCat;
  } else {
    return htmlProcessed;
  }
}
export function convertDay(dateString) {
  const dateObject = new Date(dateString);
  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth() + 1;
  const year = dateObject.getUTCFullYear();
  const formattedDate = `${day < 10 ? '0' + day : day}-${
    month < 10 ? '0' : ''
  }${month}-${year}`;
  return formattedDate;
}
export function convertthu(val) {
  const ngay = new Date(val).getDay();
  const thuArray = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return thuArray[ngay];
}
export function convertthu1(val) {
  const ngay = new Date(val).getDay();
  const thuArray = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];
  return thuArray[ngay];
}
export function dinhdangngay(ngayChuoi) {
  const nam = ngayChuoi.slice(0, 4);
  const thang = ngayChuoi.slice(4, 6);
  const ngay = ngayChuoi.slice(6, 8);
  const ngayDinhDang = `${nam}-${thang}-${ngay}`;
  return ngayDinhDang;
}
export function dinhdangngay1() {
  let ngayChuoi = new Date().toLocaleDateString();
  const nam = ngayChuoi.slice(6, 10);
  const ngay = ngayChuoi.slice(3, 5);
  const thang = ngayChuoi.slice(0, 2);
  const ngayDinhDang = `${nam}-${thang}-${ngay}`;
  return ngayDinhDang;
}
export function dinhdangngay2(dates) {
  let ngaychuoi = convertDay(dates);
  const year = ngaychuoi.slice(6, 10);
  const month = ngaychuoi.slice(3, 5);
  const date = ngaychuoi.slice(0, 2);

  return {date, month, year};
}
export function ngaythangnam(ngayChuoi) {
  const year = ngayChuoi.slice(0, 4);
  const month = ngayChuoi.slice(4, 6);
  const date = ngayChuoi.slice(6, 8);

  return {year, month, date};
}
