package QuanLyNhanVien;
public interface Menu {
    static void menuAll(){
        System.out.println("+--------------------------------+");
        System.out.println("|              Menu              |");
        System.out.println("+--------------------------------+");
        System.out.println("| 1.Danh sach nhan vien Kho      |");
        System.out.println("| 2.Danh sach nhan vien Cua Hang |");
        System.out.println("| 3.Danh sach nhan vien Thu Ngan |");
        System.out.println("| 4.Thoat                        |");
        System.out.println("+--------------------------------+");
    }
    void menuNhanVien(String Filename);
    static void menuAction(){
            System.out.println(" 1.Add Nhan Vien");
            System.out.println(" 2.Delete Nhan Vien");
            System.out.println(" 3.Update Nhan Vien");
            System.out.println(" 4.Search Nhan Vien");
            System.out.println(" 5.Quay lai man hinh chinh");
    };
}
