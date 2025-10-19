package QuanLyNhanVien;

import java.util.*;

public class MainNhanVien {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String Filename = "nhanvien.txt";
        NhanVien nhanVien;
        boolean pupu=true;
        while (pupu) {
            Menu.menuAll();
            System.out.println("Chon Nhan Vien");
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    nhanVien = new NhanVienKho("", 0, "", 0);
                    boolean temp = true;
                    while (temp) {
                        nhanVien.menuNhanVien(Filename);
                        Menu.menuAction();
                        int phat = sc.nextInt();

                        switch (phat) {
                            case 1:
                                String[] arr = nhanVien.nhapNhanVien();
                                try {
                                    if (arr.length == 4) {
                                        String ten = arr[0].trim();
                                        int tuoi = Integer.parseInt(arr[1]);
                                        String ngayVao = arr[2].trim();
                                        int time = Integer.parseInt(arr[3]);

          
                                         if (ten.isEmpty()) {
                                        System.out.println("Ten khong duoc de trong!");
                                         break;
                                        }
                                        if (tuoi <= 15 || tuoi > 100) {
                                        System.out.println(" Tuoi khong hop le (15 - 100)!");
                                        break;
                                        }
                                        if (time < 0) {
                                        System.out.println(" Gio lam viec khong duoc am!");
                                        break;
                                         }

       
                                         nhanVien = new NhanVienKho(ten, tuoi, ngayVao, time);
                                         nhanVien.addPersonToFile(Filename, nhanVien);

                                        nhanVien.addPersonToFile(Filename, nhanVien);
                                    } else {
                                        System.out.println("Du lieu khong day du.");
                                    }
                                } catch (NumberFormatException e) {
                                    System.out.println("Error Data");
                                }
                                break;
                            case 2:
                                System.out.println("Nhap Id nhan vien ban can Xoa");
                                int id1 = sc.nextInt();
                                sc.nextLine();
                                nhanVien.deletePersonToFile(Filename, id1, "KH");
                                break;
                            case 3:
                                System.out.println("Nhap Id nhan vien ban can Update");
                                int id2 = sc.nextInt();
                                sc.nextLine();
                                String arr1[] = nhanVien.nhapNhanVien();
                                nhanVien.updatePersonToFile(Filename, id2, "KH", arr1[0], Integer.parseInt(arr1[1]),
                                        arr1[2], Integer.parseInt(arr1[3]));
                                        break;
                            case 4:
                                System.out.println("Nhap Ten Ban muon tim");
                                sc.nextLine();
                                String tempName = sc.nextLine().trim();
                                nhanVien.SearchPersonToFile(Filename, tempName,"KH");
                                System.out.println("+-------End Search---------+");
                                break;
                            case 5: 
                                temp=false;
                                break;
                            default:
                                System.out.println("Moi ban nhap lai");
                                break;
                        }
                    }
                    break;
                case 2:
                nhanVien = new NhanVienCuaHang("", 0, "", 0);
                boolean temp1 = true;
                while (temp1) {
                    nhanVien.menuNhanVien(Filename);
                    Menu.menuAction();
                    int phat = sc.nextInt();

                    switch (phat) {
                        case 1:
                                String[] arr = nhanVien.nhapNhanVien();
                                try {
                                    if (arr.length == 4) {
                                        String ten = arr[0].trim();
                                        int tuoi = Integer.parseInt(arr[1]);
                                        String ngayVao = arr[2].trim();
                                        int time = Integer.parseInt(arr[3]);

          
                                         if (ten.isEmpty()) {
                                        System.out.println("Ten khong duoc de trong!");
                                         break;
                                        }
                                        if (tuoi <= 0 || tuoi > 100) {
                                        System.out.println(" Tuoi khong hop le (1 - 100)!");
                                        break;
                                        }
                                        if (time < 0) {
                                        System.out.println(" Gio lam viec khong duoc am!");
                                        break;
                                         }

       
                                         nhanVien = new NhanVienKho(ten, tuoi, ngayVao, time);
                                         nhanVien.addPersonToFile(Filename, nhanVien);

                                        nhanVien.addPersonToFile(Filename, nhanVien);
                                    } else {
                                        System.out.println("Du lieu khong day du.");
                                    }
                                } catch (NumberFormatException e) {
                                    System.out.println("Error Data");
                                }
                                break;
                        case 2:
                            System.out.println("Nhap Id nhan vien ban can Xoa");
                            int id1 = sc.nextInt();
                            sc.nextLine();
                            nhanVien.deletePersonToFile(Filename, id1, "CH");
                            break;
                        case 3:
                            System.out.println("Nhap Id nhan vien ban can Update");
                            int id2 = sc.nextInt();
                            sc.nextLine();
                            String arr1[] = nhanVien.nhapNhanVien();
                            nhanVien.updatePersonToFile(Filename, id2, "CH", arr1[0], Integer.parseInt(arr1[1]),
                                    arr1[2], Integer.parseInt(arr1[3]));
                            break;
                        case 4:
                            System.out.println("Nhap Ten Ban muon tim");
                            sc.nextLine();
                            String tempName = sc.nextLine().trim();
                            nhanVien.SearchPersonToFile(Filename, tempName,"CH");
                            System.out.println("+-------End Search---------+");
                            break;
                        case 5: 
                            temp1=false;
                            break;
                        default:
                            System.out.println("Moi ban nhap lai");
                            break;
                    }
                }
                break;
                case 3:
                nhanVien = new NhanVienThuNgan("", 0, "", 0);
                boolean temp2 = true;
                while (temp2) {
                    nhanVien.menuNhanVien(Filename);
                    Menu.menuAction();
                    int phat = sc.nextInt();

                    switch (phat) {
                        case 1:
                                String[] arr = nhanVien.nhapNhanVien();
                                try {
                                    if (arr.length == 4) {
                                        String ten = arr[0].trim();
                                        int tuoi = Integer.parseInt(arr[1]);
                                        String ngayVao = arr[2].trim();
                                        int time = Integer.parseInt(arr[3]);

          
                                         if (ten.isEmpty()) {
                                        System.out.println("Ten khong duoc de trong!");
                                         break;
                                        }
                                        if (tuoi <= 0 || tuoi > 100) {
                                        System.out.println(" Tuoi khong hop le (1 - 100)!");
                                        break;
                                        }
                                        if (time < 0) {
                                        System.out.println(" Gio lam viec khong duoc am!");
                                        break;
                                         }

       
                                         nhanVien = new NhanVienKho(ten, tuoi, ngayVao, time);
                                         nhanVien.addPersonToFile(Filename, nhanVien);

                                        nhanVien.addPersonToFile(Filename, nhanVien);
                                    } else {
                                        System.out.println("Du lieu khong day du.");
                                    }
                                } catch (NumberFormatException e) {
                                    System.out.println("Error Data");
                                }
                                break;
                        case 2:
                            System.out.println("Nhap Id nhan vien ban can Xoa");
                            int id1 = sc.nextInt();
                            sc.nextLine();
                            nhanVien.deletePersonToFile(Filename, id1, "TN");
                            break;
                        case 3:
                            System.out.println("Nhap Id nhan vien ban can Update");
                            int id2 = sc.nextInt();
                            sc.nextLine();
                            String arr1[] = nhanVien.nhapNhanVien();
                            nhanVien.updatePersonToFile(Filename, id2, "TN", arr1[0], Integer.parseInt(arr1[1]),
                                    arr1[2], Integer.parseInt(arr1[3]));
                                    break;
                        case 4:
                            System.out.println("Nhap Ten Ban muon tim");
                            sc.nextLine();
                            String tempName = sc.nextLine().trim();
                            nhanVien.SearchPersonToFile(Filename, tempName,"TN");
                            System.out.println("+-------End Search---------+");
                            break;
                        case 5: 
                            temp2=false;
                            break;
                        default:
                            System.out.println("Moi ban nhap lai");
                            break;
                    }
                }
                break;
                case 4:
                    pupu=false;
                break;
                default:
                System.out.println("Moi ban nhap lai");
                break;
            }

        }
    }
}