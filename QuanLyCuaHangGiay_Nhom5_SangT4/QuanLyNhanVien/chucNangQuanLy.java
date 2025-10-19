package QuanLyNhanVien;

public interface chucNangQuanLy {
    int tinhLuong();

    String[] nhapNhanVien();

    void addPersonToFile(String filename, NhanVien newNhanVien);

    void deletePersonToFile(String filename, int id, String ma);

    void SearchPersonToFile(String Filename, String name,String Ma);

    void updatePersonToFile(String filename, int id, String ma, String name, int age, String date, int time);
}
