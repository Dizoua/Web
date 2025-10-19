package QuanLyHoaDon;
public class SanPham {
    private String loaiSanPham;
    private double giaSanPham;
    private int soLuong;

    public SanPham(String loaiSanPham, double giaSanPham, int soLuong) {
        this.loaiSanPham = loaiSanPham;
        this.giaSanPham = giaSanPham;
        this.soLuong = soLuong;
    }


    public String getLoaiSanPham() { return loaiSanPham; }
    public double getGiaSanPham() { return giaSanPham; }
    public int getSoLuong() { return soLuong; }

    public void setLoaiSanPham(String loaiSanPham) { this.loaiSanPham = loaiSanPham; }
    public void setGiaSanPham(double giaSanPham) { this.giaSanPham = giaSanPham; }
    public void setSoLuong(int soLuong) { this.soLuong = soLuong; }

    public void displayInfo() {
        System.out.println("Loai San Pham: " + loaiSanPham);
        System.out.println("Gia San Pham: " + giaSanPham);
        System.out.println("So Luong: " + soLuong);
    }
    @Override
    public String toString() {
        return "SanPham: " + loaiSanPham + ", Gia: " + giaSanPham + ", So Luong: " + soLuong;
    }
}
