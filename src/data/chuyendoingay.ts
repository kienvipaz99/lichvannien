import {convertDay} from '../res/converts';

const PI = Math.PI;

function layPhanNguyen(d: number): number {
  return Math.floor(d);
}

function tinhNgayJulian(ngay: number, thang: number, nam: number): number {
  let a, y, m, jd;

  a = layPhanNguyen((14 - thang) / 12);
  y = nam + 4800 - a;
  m = thang + 12 * a - 3;

  jd =
    ngay +
    layPhanNguyen((153 * m + 2) / 5) +
    365 * y +
    layPhanNguyen(y / 4) -
    layPhanNguyen(y / 100) +
    layPhanNguyen(y / 400) -
    32045;

  if (jd < 2299161) {
    jd =
      ngay +
      layPhanNguyen((153 * m + 2) / 5) +
      365 * y +
      layPhanNguyen(y / 4) -
      32083;
  }

  return jd;
}

function tinhMoiTrang(k: number): number {
  const dr = PI / 180;
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  let Jd1, M, Mpr, F, C1, deltat, JdNew;

  Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 =
    C1 -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M));
  C1 =
    C1 -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 =
    C1 +
    0.001 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));

  if (T < -11) {
    deltat =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }

  JdNew = Jd1 + C1 - deltat;
  return JdNew;
}

function tinhGocDoMatTroi(jdn: number): number {
  const dr = PI / 180;
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL =
    DL +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - PI * 2 * layPhanNguyen(L / (PI * 2));
  return L;
}

function layGocDoMatTroi(dayNumber: number, timeZone: number): number {
  return layPhanNguyen(
    (tinhGocDoMatTroi(dayNumber - 0.5 - timeZone / 24) / PI) * 6,
  );
}

function layNgayTrangMoi(k: number, timeZone: number): number {
  return layPhanNguyen(tinhMoiTrang(k) + 0.5 + timeZone / 24);
}

function layThangTrangMoi11(yy: number, timeZone: number): number {
  let k, off, nm, sunLong;

  off = tinhNgayJulian(31, 12, yy) - 2415021;
  k = layPhanNguyen(off / 29.530588853);
  nm = layNgayTrangMoi(k, timeZone);
  sunLong = layGocDoMatTroi(nm, timeZone); // góc độ mặt trời tại nửa đêm địa phương

  if (sunLong >= 9) {
    nm = layNgayTrangMoi(k - 1, timeZone);
  }

  return nm;
}

function layChenhLechThangNhuon(a11: number, timeZone: number): number {
  let k, last, arc, i;

  k = layPhanNguyen((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  last = 0;
  i = 1; // Bắt đầu với tháng sau tháng trăng mới 11
  arc = layGocDoMatTroi(layNgayTrangMoi(k + i, timeZone), timeZone);

  do {
    last = arc;
    i++;
    arc = layGocDoMatTroi(layNgayTrangMoi(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);

  return i - 1;
}

export function chuyenDoiDuongLichSangAmLich(
  dd: number,
  mm: number,
  yy: number,
  timeZone: number,
) {
  let k,
    dayNumber,
    monthStart,
    a11,
    b11,
    lunarDay,
    lunarMonth,
    lunarYear,
    lunarLeap;

  dayNumber = tinhNgayJulian(dd, mm, yy);
  k = layPhanNguyen((dayNumber - 2415021.076998695) / 29.530588853);
  monthStart = layNgayTrangMoi(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = layNgayTrangMoi(k, timeZone);
  }

  a11 = layThangTrangMoi11(yy, timeZone);
  b11 = a11;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = layThangTrangMoi11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = layThangTrangMoi11(yy + 1, timeZone);
  }

  lunarDay = dayNumber - monthStart + 1;

  const diff = layPhanNguyen((monthStart - a11) / 29);
  lunarLeap = 0;
  lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = layChenhLechThangNhuon(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;

      if (diff === leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }

  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }

  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return {
    lunarDay,
    lunarMonth,
    lunarYear,
    lunarLeap,
  };
}
function jdSangNgayThang(jd: number) {
  var a, b, c, d, e, m, ngayduong, thangduong, namduong;
  if (jd > 2299160) {
    a = jd + 32044;
    b = layPhanNguyen((4 * a + 3) / 146097);
    c = a - layPhanNguyen((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  d = layPhanNguyen((4 * c + 3) / 1461);
  e = c - layPhanNguyen((1461 * d) / 4);
  m = layPhanNguyen((5 * e + 2) / 153);
  ngayduong = e - layPhanNguyen((153 * m + 2) / 5) + 1;
  thangduong = m + 3 - 12 * layPhanNguyen(m / 10);
  namduong = b * 100 + d - 4800 + layPhanNguyen(m / 10);
  return `${namduong}-${thangduong}-${ngayduong}`;
}
export function chuyenDoiAmLichSangDuongLich(
  ngayAm: number,
  thangAm: number,
  namAm: number,
  timeZone: number,
) {
  var k, a11, b11, off, chenhLechNhuan, thangBatDau;
  if (thangAm < 11) {
    a11 = layThangTrangMoi11(namAm - 1, timeZone);
    b11 = layThangTrangMoi11(namAm, timeZone);
  } else {
    a11 = layThangTrangMoi11(namAm, timeZone);
    b11 = layThangTrangMoi11(namAm + 1, timeZone);
  }
  off = thangAm - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    chenhLechNhuan = layChenhLechThangNhuon(a11, timeZone);
    let thangNhuanAm = chenhLechNhuan - 2;
    if (thangNhuanAm < 0) {
      thangNhuanAm += 12;
    }

    if (thangAm < thangNhuanAm) {
      off += 0;
    } else if (thangNhuanAm !== 0 && thangAm !== thangNhuanAm) {
      off += 1;
    } else if (thangNhuanAm !== 0 || off >= chenhLechNhuan) {
      off += 0;
    }
  }
  k = layPhanNguyen(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  thangBatDau = layNgayTrangMoi(k + off, timeZone);
  const ngayJulian = thangBatDau + ngayAm - 1;
  let ngaythangnam = jdSangNgayThang(ngayJulian);
  chenhLechNhuan = layChenhLechThangNhuon(a11, timeZone);
  let thangNhuanAm = chenhLechNhuan - 2;
  return {ngaythangnam, thangNhuanAm};
}
export function kiemTraNgayHopLe(ngay: number, thang: number, nam: number) {
  const date = new Date(nam, thang - 1, ngay);
  if (
    date.getDate() === ngay &&
    date.getMonth() === thang - 1 &&
    date.getFullYear() === nam
  ) {
    return true; // Ngày hợp lệ
  } else {
    return false; // Ngày không hợp lệ
  }
}
export function songaytrongthang() {
  let mangSoTu1Den31 = [];
  for (let i = 1; i <= 31; i++) {
    mangSoTu1Den31.push(i);
  }
  return mangSoTu1Den31;
}
export function sonthang() {
  let thang = [];
  for (let i = 1; i <= 12; i++) {
    thang.push(i);
  }
  return thang;
}
export function sonam() {
  let nam = [];
  for (let i = 1900; i <= 2100; i++) {
    nam.push(i);
  }
  return nam;
}
