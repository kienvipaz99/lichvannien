interface Calendar {
  solarDay: string;
  solarInfo: {
    'Tháng năm': string;
    Ngày: string;
    Thứ: string;
    'Danh ngôn': string;
    'Tác giả': string;
  };
  lunarDay: string;
  lunarInDay: {
    'Ngày Bình thường': string;
    'Ngày Hắc đạo': string;
    'Ngày Hoàng đạo': string;
    'Giờ Hoàng đạo': string;
    'Giờ Hắc đạo': string;
    Năm: string;
    Mùa: string;
    Vượng: string;
    Khắc: string;
    Ngày: string;
    'Tuổi xung': string;
    'Tiết khí': string;
    Sao: string;
    'Ngũ hành': string;
    'Động vật': string;
    Trực: string;
    'Xuất hành': string;
    'Hỷ thần': string;
    'Tài thần': string;
    'Kê thần': string;
    'Cát tinh': string;
    'Minh tinh': string;
    'U Vi tinh': string;
    'Tục Thế': string;
    'Sát tinh': string;
    'Hoả tai': string;
    'Nguyệt Hoả(Độc Hoả)': string;
    'Tam tang': string;
    'Ly sàng': string;
    'Quỷ khốc': string;
    'Mặt trời': string;
    'Hà Nội': string;
    'TP.Hồ Chí Minh': string;
  };
  lunarInfo: {
    'Giờ hoàng đạo': string;
    'Tiết khí': string;
    'Tên năm tháng ngày': string;
    Tháng: string;
    Ngày: string;
    'Can chi': string;
    'Mệnh ngày': string;
  };
  lunarInHour: {
    '0:00': string;
    '1:00': string;
    '3:00': string;
    '5:00': string;
    '7:00': string;
    '9:00': string;
    '11:00': string;
    '13:00': string;
    '15:00': string;
    '17:00': string;
    '19:00': string;
    '21:00': string;
    '23:00': string;
  };
  horoscope: {
    'Bát tự': string;
  };
  juliusDay: {
    'Âm lịch': string;
    'Ngày Julius': string;
  };
}
interface DayCalendar {
  date: number;
  dayInWeek: number;
  holiday: string;
  isToday: boolean;
  month: number;
  weekDay: string;
  year: number;
}
