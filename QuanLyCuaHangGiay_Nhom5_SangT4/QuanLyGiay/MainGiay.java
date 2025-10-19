package QuanLyGiay;

import java.util.Scanner;

public class MainGiay {

    public static void main(String[] args) {
        
        QuanLyGiay quanLyGiay = new QuanLyGiay();

        quanLyGiay.DocFile();

        Scanner scanner = new Scanner(System.in);
        int choice;
        do {
            System.out.println(".__________________________________________.");
            System.out.println("|              Menu Quan Ly Giay           |");
            System.out.println("|__________________________________________|");
            System.out.println("| 1. Hien thi danh sach giay               |");
            System.out.println("| 2. Them giay moi                         |");
            System.out.println("| 3. Xoa giay theo id                      |");
            System.out.println("| 4. Chinh sua giay theo id                |");
            System.out.println("| 5. Tim kiem giay theo id                 |");
            System.out.println("| 6. Kiem tra so mau cua moi loai giay     |");
            System.out.println("| 7. Quay lai menu tong                    |");
            System.out.println("|__________________________________________|");
            System.out.print("Chon mot lua chon: ");
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.println("Danh sach giay:");
                    quanLyGiay.hiendanhsach();
                    break;
                case 2:
                    quanLyGiay.them();
                    break;
                case 3:
                    quanLyGiay.xoa();
                    break;
                case 4:
                    quanLyGiay.sua();
                    break;
                case 5:
                    quanLyGiay.timkiem();
                    break;
                case 6:
                    quanLyGiay.DemSoMau(quanLyGiay, "BD");
                    quanLyGiay.DemSoMau(quanLyGiay, "BR");
                    quanLyGiay.DemSoMau(quanLyGiay, "RN");
                    quanLyGiay.DemSoMau(quanLyGiay, "GS");
                    break;
                case 7:
                    return;
                default:
                    System.out.println("Lua chon khong hop le");
                    break;
            }
          
        } while (choice != 7);
    }
}
