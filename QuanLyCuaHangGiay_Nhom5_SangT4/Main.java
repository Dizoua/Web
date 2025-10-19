import java.util.Scanner;
import QuanLyKhachHang.*;
import QuanLyNhanVien.MainNhanVien;
import QuanLyGiay.*;
import QuanLyHoaDon.*;

public class Main {

    public static void main(String[] args) {

        // Hiển thị menu tổng cho người dùng
        Scanner scanner = new Scanner(System.in);
        int mainChoice;

        do {
            System.out.println("._____________________________________.");
            System.out.println("|              Menu Tong              |");
            System.out.println("|_____________________________________|");
            System.out.println("| 1. Vao Quan Ly Giay                 |");
            System.out.println("| 2. Vao Quan Ly Hoa Don              |");
            System.out.println("| 3. Vao Quan Ly Nhan Vien            |");
            System.out.println("| 4. Vao Quan Ly Khach Hang           |");
            System.out.println("| 5. Thoat Chuong Trinh               |");
            System.out.println("|_____________________________________|");
            System.out.print("Chon mot lua chon: ");
            mainChoice = scanner.nextInt();
            scanner.nextLine();

            switch (mainChoice) {
                case 1:
                    MainGiay.main(args);
                    break;
                case 2:
                    MainHoaDon.main(args);
                    break;
                case 3:
                    MainNhanVien.main(args);
                    break;
                case 4:
                    mainKhachHang.main(args);
                    break;
                case 5:
                    System.out.println("Thoat chuong trinh");
                    break;
                default:
                    System.out.println("Lua chon khong hop le");
                    break;
            }
        } while (mainChoice != 5);

        scanner.close();
    }

}