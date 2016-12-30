export const lotterySettingsRef = '/settings/lottery';     // Đường dẫn tới data trên firebase
export const lotteryCurrentPrizeRef = '/settings/lottery/displayCurrentPrize';
export const lotteryCurrentSlotRef = '/settings/lottery/displayCurrentSlot';


export class LotterySettings {
    resultMaxCount: number;         // Giới hạn số kết quả trả về khi truy vấn tại firebase

    displayCurrentSlot: number;     // Số hiển thị lớn trên slot quay số tại (Bảng tin) và (Quay số)
    displayCurrentPrize: number;    // Giải thưởng hiện tại phần (Quay số)
    displayMainTitle: string;       // Title chào mừng tại (Bảng tin)  
    displaySubtitle: string;        // Subtitle chào mừng tại (Bảng tin)
    displayHostName: string;        // Tên đơn vị tổ chức hiển thị trên (Bảng tin)
    displayHostLogoUrl: string;     // Logo url của đơn vị tổ chức hiển thị trên (Bảng tin)

    numberRandomMax: number;        // Giới hạn trên của thuật toán randomize
    numberRandomMin: number;        // Giới hạn dưới của thuật toán randomize
}