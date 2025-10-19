package QuanLyNhanVien;

import java.util.*;

public abstract class NhanVien implements chucNangQuanLy,Menu{
    private String name;
    private int Age;
    private String Date;
    private int Time;
    public NhanVien(String name,int Age,String Date,int Time){
        this.name=name;
        this.Age=Age;
        this.Date=Date;
        this.Time=Time;
    }
    public String getname(){
        return name;
    }
    public int getAge(){
        return Age;
    }
    public String getDate(){
        return Date;
    }
    public int getTime(){
        return Time;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        Age = age;
    }
    public void setDate(String date) {
        Date = date;
    }
    public void setTime(int time) {
        Time = time;
    }
    public abstract int getId();
    public abstract String getMa();
    public abstract void setId(int id);
    public abstract int tinhLuong();
    @Override
    public void SearchPersonToFile(String Filename, String name, String Ma) {

    List<List<NhanVien>> arr = ReadFromFile.readDataFromFile(Filename);
    List<NhanVien> group = null;
    switch (Ma) {
        case "KH":
            group = arr.get(0); 
            break;
        case "CH":
            group = arr.get(1); 
            break;
        case "TN":
            group = arr.get(2); 
            break;
    }

    List<NhanVien> resultList = new ArrayList<>();
    for (NhanVien myobj : group) {
        if (myobj.getname().toLowerCase().contains(name.toLowerCase())) {
            resultList.add(myobj);
        }
    }
    if (resultList.isEmpty()) {
        System.out.println("No employees found with the name \"" + name + "\".");
        return;
    }
    System.out.println("+------+-----------------------+------+------------+------+-----------+");
    System.out.println("|  Id  |      Ho va ten        | Tuoi |  Ngay Vao  | Time |  Salary   |");
    System.out.println("+------+-----------------------+------+------------+------+-----------+");

    for (NhanVien myobj : resultList) {
        System.out.printf("| %-4d | %-21s | %-4d | %-10s | %-4d | %-9d |\n",
                myobj.getId(), myobj.getname(), myobj.getAge(), myobj.getDate(), myobj.getTime(), myobj.tinhLuong());
    }

    System.out.println("+------+-----------------------+------+------------+------+-----------+");
    resultList=null;
}
    @Override
    public String[] nhapNhanVien() {
        Scanner sc = new Scanner(System.in);
        String[] arr = new String[4];
        System.out.print("Nhap ten: ");
        String name = sc.nextLine();
        arr[0] = name;
        System.out.print("Nhap tuoi: ");
        int age = sc.nextInt();
        sc.nextLine(); 
        arr[1] = String.valueOf(age);  
        System.out.print("Nhap ngay vao lam: ");
        String date = sc.nextLine();
        arr[2] = date;
        
        System.out.print("Nhap gio lam viec: ");
        int time = sc.nextInt();
        arr[3] = String.valueOf(time); 
        return arr;  
    }
    @Override
    public void addPersonToFile(String filename, NhanVien newNhanVien) {
        List<List<NhanVien>> arr = ReadFromFile.readDataFromFile(filename);
        List<NhanVien> group;
        int maxId = 0;

        switch (newNhanVien.getMa()) {
            case "KH":
                group = arr.get(0);
                break;
            case "CH":
                group = arr.get(1);
                break;
            case "TN":
                group = arr.get(2);
                break;
            default:
                System.out.println("Invalid group code.");
                return;
        }

        for (NhanVien nv : group) {
            if (nv.getId() > maxId) maxId = nv.getId();
        }

        newNhanVien.setId(maxId + 1);
        group.add(newNhanVien);
        WriteDataToFile.writeDataToFile(filename, arr);
    }

    @Override
    public void deletePersonToFile(String Filename, int id, String Ma) {
        List<List<NhanVien>> arr = ReadFromFile.readDataFromFile(Filename);
    
        if (arr == null) {
            System.out.println("Error Data");
            return;
        }
    
        List<NhanVien> group = null;
    
        if (Ma.equals("KH")) {
            group = arr.get(0);  // Kho group
        } else if (Ma.equals("CH")) {
            group = arr.get(1);  // CuaHang group
        } else if (Ma.equals("TN")) {
            group = arr.get(2);  // ThuNgan group
        } else {
            System.out.println("Error Data");
            return;
        }
    
        boolean found = false;
        for (NhanVien nhanVien : group) {
            if (nhanVien.getId() == id) {
                group.remove(nhanVien);
                found = true;
                break;
            }
        }
    
        if (found) {
            WriteDataToFile.writeDataToFile(Filename, arr);
        } else {
            System.out.println("Not Found");
        }
    }
    @Override
    public void updatePersonToFile(String Filename, int id, String Ma, String name, int age, String date, int time) {
        List<List<NhanVien>> arr = ReadFromFile.readDataFromFile(Filename);
        if (arr == null) {
            System.out.println("Error Data");
            return;
        }
        List<NhanVien> group = null;
        if (Ma.equals("KH")) {
            group = arr.get(0);  
        } else if (Ma.equals("CH")) {
            group = arr.get(1);  
        } else if (Ma.equals("TN")) {
            group = arr.get(2);  
        } 
    
        boolean found = false;
        for (NhanVien myobj : group) {
            if (myobj.getId() == id) {
                myobj.setName(name);
                myobj.setAge(age);
                myobj.setDate(date);
                myobj.setTime(time); 
                found = true;
                break; 
            }
        }
    
        if (found) {
            WriteDataToFile.writeDataToFile(Filename, arr);
            System.out.println("Update Successful");
        } else {
            System.out.println("Not Found");
        }
    }
    public abstract void menuNhanVien(String Filename);
}