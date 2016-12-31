export const lotterySettingsRef = '/settings/lottery';     // Đường dẫn tới data trên firebase

export class LotterySettings {
    resultMaxCount: number;             // Giới hạn số kết quả trả về khi truy vấn tại firebase

    
    displayCurrentSlot: number;         // Số hiển thị lớn trên slot quay số tại (Bảng tin) và (Quay số)
    displayCurrentPrize: number;        // Giải thưởng hiện tại phần (Quay số)
    displayMainTitle: string;           // Title chào mừng tại (Bảng tin)  
    displaySubtitle: string;            // Subtitle chào mừng tại (Bảng tin)
    displayHostName: string;            // Tên đơn vị tổ chức hiển thị trên (Bảng tin)
    displayHostLogoUrl?: string;        // Logo url của đơn vị tổ chức hiển thị trên (Bảng tin)
    displayThongTinGiaiThuong: boolean;
    displayThongTinGiaiThuong_GiaiNhat: string;
    displayThongTinGiaiThuong_GiaiNhi: string;
    displayThongTinGiaiThuong_GiaiBa: string;
    displayResultsInDashBoard?: boolean  // Dashboard sẽ hiển thị bảng slots (false) quay số hay bảng tổng kết kết quả (true)?

    numberRandomMax: number;            // Giới hạn trên của thuật toán randomize
    numberRandomMin: number;            // Giới hạn dưới của thuật toán randomize
}

export const defaultLotterySettings: LotterySettings = {
    resultMaxCount: 20,

    displayCurrentSlot: 0,
    displayCurrentPrize: 3,
    displayMainTitle: 'Tiêu đề chính',
    displaySubtitle: 'Tiêu đề phụ',
    displayHostName: 'Phòng Kỹ thuật Vật tư - TCT Tân Cảng Sài Gòn',
    displayThongTinGiaiThuong: true,
    displayThongTinGiaiThuong_GiaiNhat: 'Phần quà trị giá 5.000.000 VNĐ từ Ban tổ chức.',
    displayThongTinGiaiThuong_GiaiNhi: 'Phần quà trị giá 3.000.000 VNĐ từ Ban tổ chức.',
    displayThongTinGiaiThuong_GiaiBa: 'Phần quà trị giá 1.000.000 VNĐ từ Ban tổ chức.',
    displayResultsInDashBoard: false,

    numberRandomMax: 99,
    numberRandomMin: 0
}