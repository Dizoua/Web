package QuanLyNhanVien;


import java.util.List;

public class NhanVienKho extends NhanVien{
    private String Ma;
    private int id;
    NhanVienKho(String name,int Age,String Date,int Time){
        super(name,Age,Date,Time);
        this.Ma="KH";
    } 

    @Override
    public String getMa(){
        return this.Ma;  
    }
    @Override
    public int getId(){
        return this.id;
    }
    @Override
    public void setId(int id){
        this.id=id;
    }
    @Override
    public int tinhLuong(){
        return getTime()*25000;
    }
    @Override
    public String toString() {
        return String.format(
            "\"Id\": %d, \"Name\": \"%s\", \"Age\": %d, \"Date\": \"%s\", \"Ma\": \"%s\", \"Time\": %d, \"Salary\": %d",
            getId(), getname(), getAge(), getDate(), getMa(), getTime(), tinhLuong()
        );
    }
    @Override
    public void menuNhanVien(String filename) {
        List<List<NhanVien>> arr = ReadFromFile.readDataFromFile(filename);
        List<NhanVien> group = arr.get(0); 
        if (group == null) {
            System.out.println("Error Data");
            return;
        }
        
        System.out.println("+------+-----------------------+------+------------+------+-----------+");
        System.out.println("|  Id  |      Ho va ten        | Tuoi |  Ngay Vao  | Time |  Salary   |");
        System.out.println("+------+-----------------------+------+------------+------+-----------+");
    
        for (NhanVien myobj : group) {
            System.out.printf("| %-4d | %-21s | %-4d | %-10s | %-4d | %-9d |\n",
                    myobj.getId(), myobj.getname(), myobj.getAge(), myobj.getDate(), myobj.getTime(), myobj.tinhLuong());
        }
        
        System.out.println("+------+-----------------------+------+------------+------+-----------+");
    }
}
