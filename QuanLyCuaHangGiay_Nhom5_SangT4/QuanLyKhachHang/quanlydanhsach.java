    package QuanLyKhachHang;
    import java.io.BufferedReader;
    import java.io.FileReader;
    import java.io.FileWriter;
    import java.util.ArrayList;
    import java.util.Scanner;

    public class quanlydanhsach implements action3{
        public ArrayList<khachhang> danhsach = new ArrayList<>();

        @Override
    public void hiendanhsach() {
        System.out.println(".___________________________________________________________________________________________________________________________.");
        System.out.printf("| %-7s | %-20s | %-60s | %-13s | %-9s |\n", "MA","TEN KHACH HANG","DIA CHI","SO DIEN THOAI","LOAI");
        System.out.println("|---------------------------------------------------------------------------------------------------------------------------|");
        for (khachhang kh : danhsach) {
            System.out.printf("| %-7s | %-20s | %-60s | %-13s | %-9s |\n",kh.makhachhang , kh.name , kh.diachi , kh.sodienthoai , kh.loaikhachhang);
        }
        System.out.println("|___________________________________________________________________________________________________________________________|");
    }

        @Override
    public void docdulieu() {
        try {
        
            BufferedReader input = new BufferedReader(new FileReader("khachhang.txt"));
            String line = input.readLine();
            
            while (line != null) {
                String[] arr = line.split(",");
                if (arr.length == 5) {
                    khachhang kh;   
                    switch (arr[4]) { // da hinh 
                        case "Diamond":
                            kh = new diamond(arr[0], arr[1], arr[2], arr[3],arr[4]);
                            break;
                        case "Gold": 
                            kh = new gold(arr[0], arr[1], arr[2], arr[3],arr[4]);
                            break;
                        case "Silver":
                            kh = new silver(arr[0], arr[1], arr[2], arr[3],arr[4]);
                            break;
                        default:
                            System.out.println("Loại khách hàng không hợp lệ: " + arr[4]);
                            line = input.readLine();
                            continue;
                    }
                    danhsach.add(kh);
                    khachhang.soluong++;
                }
                line = input.readLine();
            }
            input.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

        @Override 
        public void ghidulieu(){
            try{
                FileWriter fw = new FileWriter("khachhang.txt");
                for(khachhang kh : danhsach){
                    fw.write(kh.makhachhang+","+kh.name+","+kh.diachi+","+kh.sodienthoai+","+kh.loaikhachhang);
                    fw.write("\n");
                }
                fw.close();
            }catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        @Override 
        public void them(){
            Scanner sc = new Scanner(System.in);
            System.out.print("Nhap ma moi:");
            String ma = sc.nextLine();
            for (khachhang kh :danhsach){
                if(kh.makhachhang.equals(ma)){
                    System.out.println("Da ton tai ma khach hang nay trong danh sach, vui long nhap lai!");
                    return;
                }
            }
            System.out.print("Nhap ten moi:");
            String ten = sc.nextLine();
            System.out.print("Nhap dia chi moi:");
            String diachi = sc.nextLine();
            System.out.print("Nhap so dien thoai moi:");
            String number = sc.nextLine();
            System.out.print("Nhap loai moi:");
            String loai = sc.nextLine().trim();
            char first =Character.toUpperCase(ma.charAt(0));
            khachhang kh;
            switch (first) {
                case 'D':
                    loai = "Diamond";
                     kh = new diamond(ma, ten, diachi, number, loai);
                     break;
                 case 'G':
                    loai = "Gold";
                    kh = new gold(ma, ten, diachi, number, loai);
                    break;
                case 'S':
                    loai = "Silver";
                    kh = new silver(ma, ten, diachi, number, loai);
                    break;
                     default:
        System.out.println("Vui long nhap dung ma! (D, G, S) *Ghi hoa chu dau");
        return;
}
            danhsach.add(kh);
            khachhang.soluong++;
            ghidulieu();
        
        }

        @Override
        public void sua(){
            Scanner sc = new Scanner(System.in);
            System.out.println("Nhap vao ma khach hang can sua:");
            String ma= sc.nextLine();
            for (khachhang kh : danhsach){
                if(kh.makhachhang.equals(ma)){
                    System.out.print("Nhap ma moi (bo trong de giu nguyen): ");
                    String newma = sc.nextLine();
                    if(newma.isEmpty()){
                        newma = ma;
                    }else if(!newma.isEmpty())
                    {
                        for(khachhang kh1 : danhsach)
                        {
                            if(kh1.makhachhang.equals(newma))
                            {
                                System.out.println("Da ton tai ma khach hang nay trong danh sach!");
                                return;
                            }
                        }
                    }
                    
                    System.out.print("Nhap ten moi:");
                    String name=sc.nextLine();
                    System.out.print("Nhap dia chi moi:");
                    String diachi=sc.nextLine();
                    System.out.print("Nhap so dien thoai moi:");
                    String sodienthoai=sc.nextLine();
                    System.out.print("Nhap loai moi:");
                    String loaikh = sc.nextLine();
                    switch (loaikh) {
                        case "Diamond":
                        if (newma.charAt(0)!='D'){
                            System.out.println("Nhap sai ma! *Ghi hoa chu dau");
                            return;
                        }
                            break;
                        case "Gold":
                        if (newma.charAt(0)!='G'){
                            System.out.println("Nhap sai ma! *Ghi hoa chu dau");
                            return;
                        }
                            break;
                        case "Silver":
                        if (newma.charAt(0)!='S'){
                            System.out.println("Nhap sai ma! *Ghi hoa chu dau");
                            return;
                        }
                            break;
                        default:
                        System.out.println("Vui long nhap dung loai! *Ghi hoa chu dau");
                            return;
                    }
                    kh.makhachhang = newma;
                    kh.name = name;
                    kh.diachi = diachi;
                    kh.sodienthoai = sodienthoai;
                    kh.loaikhachhang = loaikh;
                    System.out.println("Da cap nhat thong tin khach hang thanh cong");
                    ghidulieu();
                    return;
                }
            }
            
            System.out.println("Khong tim thay khach hang nay trong danh sach");
        }



        @Override
        public void xoa() {
            Scanner sc = new Scanner(System.in);
            System.out.println("Nhap vao ma khach hang can xoa:");
            String ma = sc.nextLine();
        
            for (khachhang kh : danhsach){
                if(kh.makhachhang.equals(ma)){
                    danhsach.remove(kh);
                    System.out.println("Da xoa thanh cong khach hang nay");
                    ghidulieu();
                    khachhang.soluong--;
                    return; 
                }
            }
            System.out.println("Khong tim thay khach hang nay trong danh sach");
        }
        @Override
        public void hientongkhachhang(){
            khachhang.indem();
        }
        @Override
        public void timkiemkhachhang(){
            Scanner sc = new Scanner(System.in);
            System.out.println("Nhap vao ma khach hang: ");
            String ma = sc.nextLine();
            for (khachhang kh : danhsach){
                if(kh.makhachhang.equals(ma)){
                    kh.hienthongtin();
                    return;
                }
            }
            System.out.println("Khong tim thay khach hang trong danh sach");
        }
    }

