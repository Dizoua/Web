package QuanLyNhanVien;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
public class WriteDataToFile {
    public static void writeDataToFile(String filename, List<List<NhanVien>> arr) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (List<NhanVien> group : arr) {
                for (NhanVien nhanVien : group) {
                    writer.write(nhanVien.toString());
                    writer.newLine();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
