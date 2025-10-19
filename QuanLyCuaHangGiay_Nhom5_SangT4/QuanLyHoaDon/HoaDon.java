package QuanLyHoaDon;
import java.util.ArrayList;

public class HoaDon {
    private String idHoaDon;
    private String idKhachHang;
    private String tenKhachHang;
    private String diachiGiao;
    private String sdt;
    private ArrayList<SanPham> danhSachSanPham;

    public HoaDon(String idHoaDon, String idKhachHang, String tenKhachHang, String diachiGiao, String sdt) {
        this.idHoaDon = idHoaDon;
        this.idKhachHang = idKhachHang;
        this.tenKhachHang = tenKhachHang;
        this.diachiGiao = diachiGiao;
        this.sdt = sdt;
        this.danhSachSanPham = new ArrayList<>();
    }

    public void themSanPham(SanPham sanPham) {
        danhSachSanPham.add(sanPham);
    }

    public double tinhTongTien()
    {
        double tongTien = 0;
        for (SanPham sanPham : danhSachSanPham)
        {
            tongTien += sanPham.getGiaSanPham() * sanPham.getSoLuong();
        }
        return tongTien;
    }

    
    public String getIdHoaDon() { return idHoaDon; }
    public String getIdKhachHang() { return idKhachHang; }
    public String getTenKhachHang() { return tenKhachHang; }
    public String getDiachiGiao() { return diachiGiao; }
    public String getSdt() { return sdt; }
    public ArrayList<SanPham> getDanhSachSanPham() { return danhSachSanPham; }

    
    public void setIdHoaDon(String idHoaDon) { this.idHoaDon = idHoaDon; }
    public void setIdKhachHang(String idKhachHang) { this.idKhachHang = idKhachHang; }
    public void setTenKhachHang(String tenKhachHang) { this.tenKhachHang = tenKhachHang; }
    public void setDiachiGiao(String diachiGiao) { this.diachiGiao = diachiGiao; }
    public void setSdt(String sdt) { this.sdt = sdt; }
    public void setDanhSachSanPham(ArrayList<SanPham> danhSachSanPham) { this.danhSachSanPham = danhSachSanPham; }

    public void displayInfo()
    {
        System.out.println("ID Hoa Don: " + idHoaDon);
        System.out.println("ID Khach Hang: " + idKhachHang);
        System.out.println("Ten Khach Hang: " + tenKhachHang);
        System.out.println("Dia Chi Giao: " + diachiGiao);
        System.out.println("SDT: " + sdt);
        System.out.println("Danh Sach San Pham:");
        for (SanPham sanPham : danhSachSanPham)
        {
            sanPham.displayInfo();
        }
        System.out.println("Tong Tien: " + tinhTongTien());
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Hoa Don: ID: ").append(idHoaDon)
          .append("\nKhach Hang: ").append(tenKhachHang)
          .append("\nDia Chi: ").append(diachiGiao)
          .append("\nSDT: ").append(sdt)
          .append("\nDanh Sach San Pham:\n");

        for (SanPham sanPham : danhSachSanPham) {
            sb.append(sanPham.toString()).append("\n");
        }
        sb.append("Tong Tien: ").append(tinhTongTien());
        return sb.toString();
    }
}
