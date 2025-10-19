package QuanLyHoaDon;
import java.util.*;
import QuanLyGiay.QuanLyGiay;
public class MainHoaDon
{
    public static void main(String[] args) {
    QuanLyHoaDon quanLyHoaDon = new QuanLyHoaDon();
    QuanLyGiay quanLyGiay = new QuanLyGiay();
        quanLyHoaDon.DocFile();
        quanLyGiay.DocFile();

        int choice;
        Scanner scanner = new Scanner(System.in);
        
        do {
            System.out.println("._____________________________________________________.");
            System.out.println("|                 Menu Quan Ly Hoa Don                |");
            System.out.println("|_____________________________________________________|");
            System.out.println("| 1. Hien thi danh sach hoa don                       |");
            System.out.println("| 2. Them hoa don moi                                 |");
            System.out.println("| 3. Xoa hoa don theo id                              |");
            System.out.println("| 4. Chinh thong tin hoa don theo id                  |");
            System.out.println("| 5. Tim kiem hoa don theo id                         |");
            System.out.println("| 6. Quay lai menu tong                               |");
            System.out.println("|_____________________________________________________|");
            System.out.print("Chon mot lua chon: ");
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    quanLyHoaDon.hiendanhsach();
                    break;
                case 2:
                    quanLyHoaDon.them(quanLyGiay);
                    break;
                case 3:
                    quanLyHoaDon.xoa();
                    break;
                case 4:
                    quanLyHoaDon.sua();
                    break;
                case 5:
                    quanLyHoaDon.timkiem();
                    break;
                case 6:
                    return;
                default:
                    System.out.println("Lua chon khong hop le");
                    break;
            }
          
        } while (choice != 6);
    }
}

