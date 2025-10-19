package QuanLyHoaDon;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import QuanLyGiay.QuanLyGiay;
import QuanLyGiay.Shoe;

public class QuanLyHoaDon implements action2 {
    private ArrayList<HoaDon> danhSachHoaDon;

    public QuanLyHoaDon() {
        danhSachHoaDon = new ArrayList<>();
    }

    @Override
    public void DocFile() {
        try (BufferedReader br = new BufferedReader(new FileReader("HoaDon.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] mainParts = line.split(",", 6);

                if (mainParts.length == 6) {

                    String idHoaDon = mainParts[0].trim();
                    String idKhachHang = mainParts[1].trim();
                    String tenKhachHang = mainParts[2].trim();
                    String diachiGiao = mainParts[3].trim();
                    String sdt = mainParts[4].trim();

                    
                    HoaDon hoaDon = new HoaDon(idHoaDon, idKhachHang, tenKhachHang, diachiGiao, sdt);

                    
                    String[] sanPhamParts = mainParts[5].split(";");

                    for (String sanPhamStr : sanPhamParts) {
                        String[] sanPhamInfo = sanPhamStr.split(",");

                        if (sanPhamInfo.length == 3) {
                            String loaiSanPham = sanPhamInfo[0].trim();
                            double giaSanPham = Double.parseDouble(sanPhamInfo[1].trim());
                            int soLuong = Integer.parseInt(sanPhamInfo[2].trim());

                            SanPham sanPham = new SanPham(loaiSanPham, giaSanPham, soLuong);
                            hoaDon.themSanPham(sanPham);
                        }
                    }

                    danhSachHoaDon.add(hoaDon);
                } else {
                    System.out.println("Du lieu khong hop le: " + line);
                }
            }
        } catch (IOException e) {
            System.out.println("Loi đoc file: " + e.getMessage());
        }
    }

    //Ghi dữ liệu
    public void ghidulieu() {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("hoadon.txt"))) {
            for (HoaDon hoaDon : danhSachHoaDon) {
                // Ghi thông tin hóa đơn
                String data = hoaDon.getIdHoaDon() + "," +
                        hoaDon.getIdKhachHang() + "," +
                        hoaDon.getTenKhachHang() + "," +
                        hoaDon.getDiachiGiao() + "," +
                        hoaDon.getSdt();

                // Ghi thông tin sản phẩm
                StringBuilder sanPhamData = new StringBuilder();
                for (SanPham sanPham : hoaDon.getDanhSachSanPham()) {
                    if (sanPhamData.length() > 0) {
                        sanPhamData.append(";");
                    }
                    sanPhamData.append(sanPham.getLoaiSanPham() + "," +
                            sanPham.getGiaSanPham() + "," +
                            sanPham.getSoLuong());
                }

                //Thêm hóa đơn vào file nếu có sản phẩm
                if (sanPhamData.length() > 0) {
                    data += "," + sanPhamData.toString();
                }

                // Ghi dữ liệu vào file
                bw.write(data);
                bw.newLine();
            }
            System.out.println("Ghi du lieu thanh cong.");
        } catch (IOException e) {
            System.out.println("Loi khi ghi du lieu: " + e.getMessage());
        }
    }

    // Thêm hóa đơn
    @Override
    public void them(QuanLyGiay quanLyGiay) {
        Scanner scanner = new Scanner(System.in);

        String idHoaDon; 
        boolean idHopLe = false;

        //Kiểm tra id
        do {
            System.out.print("Nhap ID Hoa Don: ");
            idHoaDon = scanner.nextLine().trim();

            boolean idDaTonTai = false;
            for (HoaDon hd : danhSachHoaDon) {
                if (hd.getIdHoaDon().equals(idHoaDon)) {
                    idDaTonTai = true;
                    break;
                }
            }

            if (idDaTonTai) {
                System.out.println("ID Hoa Don nay da duoc su dung. Vui long nhap ID khac.");
            } else {
                idHopLe = true;
            }
        } while (!idHopLe);

        System.out.print("Nhap ID Khach Hang: ");
        String idKhachHang = scanner.nextLine().trim();

        System.out.print("Nhap Ten Khach Hang: ");
        String tenKhachHang = scanner.nextLine().trim();

        System.out.print("Nhap Dia Chi Giao: ");
        String diachiGiao = scanner.nextLine().trim();

        System.out.print("Nhap SDT: ");
        String sdt = scanner.nextLine().trim();

        HoaDon hoaDon = new HoaDon(idHoaDon, idKhachHang, tenKhachHang, diachiGiao, sdt);
        boolean themSanPham = true;
        while (themSanPham) {
            System.out.print("Nhap Ma Giay (ID Giay): ");
            String idGiay = scanner.nextLine().trim();

            // Tìm giày theo mã ID trong danh sách giày

            Shoe shoe = quanLyGiay.SearchForBill(idGiay);

            if (shoe != null) {
                System.out.print("Nhap So Luong: ");
                int soLuong = scanner.nextInt();
                scanner.nextLine();

                if (shoe.getQuantity() >= soLuong) {
                    SanPham sanPham = new SanPham(shoe.getId(), shoe.getPrice(), soLuong);
                    hoaDon.themSanPham(sanPham);

                    shoe.setQuantity(shoe.getQuantity() - soLuong);

                    System.out.println("Giay da duoc them vao hoa don.");
                } else {
                    System.out.println("So luong giay trong kho khong du.");
                }
            } else {
                System.out.println("Khong tim thay giay voi ID: " + idGiay);
            }

            System.out.print("Ban co muon them san pham khac? (Y/N): ");
            String themKhac = scanner.nextLine().trim();
            if (!themKhac.equalsIgnoreCase("Y")) {
                themSanPham = false;
            }
        }

        danhSachHoaDon.add(hoaDon);
        ghidulieu();
        System.out.println("Them hoa don thanh cong.");
        quanLyGiay.ghidulieu();
    }

    // Sửa hóa đơn
    @Override
    public void sua() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhap ID Hoa Don can sua: ");
        String idHoaDon = scanner.nextLine().trim();

        for (HoaDon hoaDon : danhSachHoaDon) {
            if (hoaDon.getIdHoaDon().equalsIgnoreCase(idHoaDon)) {
                System.out.print("Nhap Ten Khach Hang moi: ");
                String tenKhachHang = scanner.nextLine().trim();
                hoaDon.setTenKhachHang(tenKhachHang);

                System.out.print("Nhap Dia Chi Giao moi: ");
                String diachiGiao = scanner.nextLine().trim();
                hoaDon.setDiachiGiao(diachiGiao);

                System.out.print("Nhap SDT moi: ");
                String sdt = scanner.nextLine().trim();
                hoaDon.setSdt(sdt);
                ghidulieu();

                System.out.println("Da cap nhat thong tin hoa don.");
                return;
            }
        }
        System.out.println("Khong tim thay hoa don voi ID: " + idHoaDon);
    }

    // Xóa hóa đơn
    @Override
    public void xoa() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhap ID Hoa Don can xoa: ");
        String idHoaDon = scanner.nextLine().trim();

        boolean found = false;
        for (int i = 0; i < danhSachHoaDon.size(); i++) {
            if (danhSachHoaDon.get(i).getIdHoaDon().equalsIgnoreCase(idHoaDon)) {
                danhSachHoaDon.remove(i);
                ghidulieu();
                System.out.println("Da xoa hoa don voi ID: " + idHoaDon);
                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("Khong tim thay hoa don voi ID: " + idHoaDon);
        }
    }

    // Tìm kiếm hóa đơn
    @Override
    public void timkiem() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhap ID Hoa Don can tim kiem: ");
        String idHoaDon = scanner.nextLine().trim();

        boolean found = false;
        for (HoaDon hoaDon : danhSachHoaDon) {
            if (hoaDon.getIdHoaDon().equalsIgnoreCase(idHoaDon)) {
                System.out.println("______________________________________________________________________________");
                System.out.println("Thong tin hoa don: \n" + hoaDon);
                System.out.println("______________________________________________________________________________");
                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("Khong tim thay hoa don voi ID: " + idHoaDon);
        }
    }

    // Hiển thị danh sách hóa đơn
    @Override
    public void hiendanhsach() {
        if (danhSachHoaDon.isEmpty()) {
            System.out.println("Khong co hoa don nao trong danh sach.");
        } else {
            System.out.println("DANH SACH HOA DON:");
            for (HoaDon hoaDon : danhSachHoaDon) {
                String headerFooter = ".-----------------------------------------------------------------------------.";
                System.out.println(headerFooter);
                System.out.println("|                                  HOA DON                                    |");
                System.out.println("|-----------------------------------------------------------------------------|");

                System.out.println(String.format("| %-14s %-60s |", "ID Hoa Don:", hoaDon.getIdHoaDon()));
                System.out.println(String.format("| %-14s %-60s |", "Khach Hang:", hoaDon.getTenKhachHang()));
                System.out.println(String.format("| %-14s %-60s |", "Dia Chi Giao:", hoaDon.getDiachiGiao()));
                System.out.println(String.format("| %-14s %-60s |", "SDT:", hoaDon.getSdt()));
                System.out.println("|-----------------------------------------------------------------------------|");

                System.out.println("|                                SAN PHAM                                     |");
                
                String productHeader = "| %-13s %-15s %-10s %34s |";
                for (SanPham sanPham : hoaDon.getDanhSachSanPham()) {
                    System.out.println(String.format(productHeader, "Ten San Pham:", sanPham.getLoaiSanPham(), 
                            "Gia: " + sanPham.getGiaSanPham(), "So Luong: " + sanPham.getSoLuong()));
                }

                System.out.println(String.format("| %-14s %-60s |", "Tong Tien:", hoaDon.tinhTongTien()));
                System.out.println("|_____________________________________________________________________________|");
                System.out.println("");
            }
        }
    }

}
