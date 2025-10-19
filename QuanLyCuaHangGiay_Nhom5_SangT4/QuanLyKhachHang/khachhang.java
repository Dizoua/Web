package QuanLyKhachHang;
public abstract class khachhang{
    String makhachhang;
    String name;
    String diachi;
    String sodienthoai;
    String loaikhachhang;
    static int soluong = 0;     
    public khachhang(){
        makhachhang = "";
        name = "";
        diachi = "";
        sodienthoai = "";
        loaikhachhang="";
        
    } 
    public khachhang(String makhachhang, String name,String diachi, String sodienthoai,String loaikhachhang){
        this.makhachhang = makhachhang;
        this.name = name;
        this.diachi = diachi;
        this.sodienthoai = sodienthoai;
        this.loaikhachhang = loaikhachhang;
    }

    public static void indem(){
        System.out.println("Tong so khach hang co trong danh sach: "+soluong);
    }
    public abstract void hienthongtin();
    

}
