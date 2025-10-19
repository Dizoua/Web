package QuanLyKhachHang;
public class silver extends khachhang  {
    public silver(String makhachhang, String name,String diachi, String sodienthoai,String loaikhachhang){
        super(makhachhang,name,diachi,sodienthoai,loaikhachhang);
    }
    @Override
    public void hienthongtin(){
        System.out.println("Ma: "+makhachhang+"  | Ten: "+name+"  | Dia Chi:"+ diachi+"  | SDT:"+sodienthoai+"  | Loai:"+loaikhachhang);
    }

}
