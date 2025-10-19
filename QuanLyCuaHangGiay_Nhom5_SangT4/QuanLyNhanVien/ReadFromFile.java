package QuanLyNhanVien;
import java.util.*;
import java.io.*;
public class ReadFromFile {
    public static List<List<NhanVien>> readDataFromFile(String filename) {
        List<List<NhanVien>> arr = new ArrayList<>();
        List<NhanVien> CuaHangGroup = new ArrayList<>();
        List<NhanVien> ThuNganGroup = new ArrayList<>();
        List<NhanVien> KhoGroup = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                String[] parts = line.split(",\\s*");

                try {
                    int id = Integer.parseInt(parts[0].split(":")[1].trim());
                    String name = parts[1].split(":")[1].trim().replace("\"", "");
                    int age = Integer.parseInt(parts[2].split(":")[1].trim());
                    String date = parts[3].split(":")[1].trim().replace("\"", "");
                    String ma = parts[4].split(":")[1].trim().replace("\"", "");
                    int time = Integer.parseInt(parts[5].split(":")[1].trim());

                    NhanVien nhanVien;
                    if (ma.equals("KH")) {
                        nhanVien = new NhanVienKho(name, age, date, time);
                        nhanVien.setId(id);
                        KhoGroup.add(nhanVien);
                    } else if (ma.equals("CH")) {
                        nhanVien = new NhanVienCuaHang(name, age, date, time);
                        nhanVien.setId(id);
                        CuaHangGroup.add(nhanVien);
                    } else if (ma.equals("TN")) {
                        nhanVien = new NhanVienThuNgan(name, age, date, time);
                        nhanVien.setId(id);
                        ThuNganGroup.add(nhanVien);
                    }
                } catch (Exception e) {
                    System.out.println("Error processing line: " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (!KhoGroup.isEmpty()) arr.add(KhoGroup);
        if (!CuaHangGroup.isEmpty()) arr.add(CuaHangGroup);
        if (!ThuNganGroup.isEmpty()) arr.add(ThuNganGroup);

        return arr;
    }
}
