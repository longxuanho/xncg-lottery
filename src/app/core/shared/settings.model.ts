export const settingsRef = '/settings';     // Đường dẫn tới data trên firebase
export const currentPrizeRef = '/settings/display/currentPrize';
export const displaySettingsRef = '/settings/display'; 

export class Settings {
    maxResults: number;
    display: {
        currentSlot: number;        // Số hiển thị lớn trên slot quay số tại (Bảng tin) và (Quay số)
        mainTitle: string;          // Title chào mừng tại (Bảng tin)
        hostName: string;           // Tên đơn vị tổ chức hiển thị trên (Bảng tin)
        hostLogo: string;           // Logo url của đơn vị tổ chức hiển thị trên (Bảng tin)
        maxResultCount: number;     // Giới hạn số kết quả trả về khi truy vấn tại firebase
    };
    numberRandomizer: {
        max: number;                // Giới hạn trên của thuật toán randomize
        min: number;                // Giới hạn dưới của thuật toán randomize
    };
}