package QuanLyGiay;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class QuanLyGiay implements action
{
    public ArrayList<Shoe> danhSachGiay;

    public QuanLyGiay()
    {
        danhSachGiay = new ArrayList<>();
    }

    // ĐỌC FILE
    @Override
    public void DocFile()
    {
        SoccerShoe.ResetCount();
        BasketballShoe.ResetCount();
        GymShoe.ResetCount();
        RunningShoe.ResetCount();

        try (BufferedReader br = new BufferedReader(new FileReader("Shoes.txt")))
        {
            String line;
            while ((line = br.readLine()) != null)
            {
                String[] parts = line.split(",");

                if (parts.length == 5)
                {
                    String id = parts[0].trim();
                    String name = parts[1].trim();
                    double price = Double.parseDouble(parts[2].trim());
                    String color = parts[3].trim();
                    int quantity = Integer.parseInt(parts[4].trim());

                    Shoe shoe = null;

                    if (id.startsWith("BD"))
                    {
                        shoe = new SoccerShoe(name, price, color, quantity);
                    }
                    else if (id.startsWith("BR"))
                    {
                        shoe = new BasketballShoe(name, price, color, quantity);
                    }
                    else if (id.startsWith("RN"))
                    {
                        shoe = new RunningShoe(name, price, color, quantity);
                    }
                    else if (id.startsWith("GS"))
                    {
                        shoe = new GymShoe(name, price, color, quantity);
                    }
                    else
                    {
                        System.out.println("Ma giay khong hop le!: " + id);
                    }
                    if (shoe != null)
                    {
                        danhSachGiay.add(shoe);
                    }
                }
                else
                {
                    System.out.println("Du lieu khong hop le!: " + line);
                }
            }
        }
        catch (IOException e)
        {
            System.out.println("Doc file khong thanh cong!: " + e.getMessage());
        }
    }

    // GHI VÀO FILE
    @Override
    public void ghidulieu()
    {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("Shoes.txt")))
        {
            for (Shoe shoe : danhSachGiay)
            {
                writer.write(shoe.getId() + ", " + shoe.getName() + ", " + shoe.getPrice() + ", " + shoe.getColor() + ", " + shoe.getQuantity());
                writer.newLine();
            }
        }
        catch(IOException e)
        {
            System.out.println("Loi khi ghi du lieu!" + e.getMessage());
        }
    }

    //THÊM GIÀY
    @Override
    public void them()
    {
    Scanner scanner = new Scanner(System.in);

    String name;
    do {
        System.out.print("Nhap ten giay: ");
        name = scanner.nextLine().trim();
        if (name.isEmpty()) {
            System.out.println("Ten giay khong duoc de trong! Vui long nhap lai.");
        }
    } while (name.isEmpty());

    
    double price = 0;
    boolean validPrice = false;
    while (!validPrice) {
        System.out.print("Nhap gia giay: ");
        try {
            price = Double.parseDouble(scanner.nextLine().trim());
            validPrice = true;
        } catch (NumberFormatException e) {
            System.out.println("Gia giay khong hop le! Vui long nhap lai gia giay.");
        }
    }

    String color;
    do {
        System.out.print("Nhap mau giay: ");
        color = scanner.nextLine().trim();
        if (color.isEmpty()) {
            System.out.println("Mau giay khong duoc de trong! Vui long nhap lai.");
        }
    } while (color.isEmpty());

    
    int quantity = 0;
    boolean validQuantity = false;
    
    while (!validQuantity) {
        System.out.print("Nhap so luong giay: ");
        try {
            quantity = Integer.parseInt(scanner.nextLine().trim());
             if(quantity<0)
             {
        System.out.println("So luong giay khong hop le! Vui long nhap lai so luong");
             }
             else{
            validQuantity = true;
             }
        } catch (NumberFormatException e) {
            System.out.println("So luong giay khong hop le! Vui long nhap lai so luong.");
        }
    }

    System.out.println("Chon loai giay (1: Soccer, 2: Basketball, 3: Running, 4: Gym):");
    int choice = scanner.nextInt();
    Shoe newShoe = null;

    switch (choice)
    {
        case 1:
            newShoe = new SoccerShoe(name, price, color, quantity);
            break;
        case 2:
            newShoe = new BasketballShoe(name, price, color, quantity);
            break;
        case 3:
            newShoe = new RunningShoe(name, price, color, quantity);
            break;
        case 4:
            newShoe = new GymShoe(name, price, color, quantity);
            break;
        default:
            System.out.println("Chon loai giay khong hop le!");
            return;
    }

    if (newShoe != null)
    {
        danhSachGiay.add(newShoe);
    }

    ghidulieu();

    System.out.println("Da them giay moi voi ID: " + newShoe.getId());
}


    //CHỈNH SỬA
    @Override
    public void sua()
    {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhap id giay can chinh sua: ");
        String id = scanner.nextLine().trim();

        boolean found = false;
        for (int i = 0; i < danhSachGiay.size(); i++)
        {
            Shoe shoe = danhSachGiay.get(i);
            if (shoe.getId().equalsIgnoreCase(id))
            {
                found = true;
                System.out.println("Da tim thay id giay can chinh sua");

                System.out.print("Nhap ten moi (bo trong de giu nguyen): ");
                String newName = scanner.nextLine().trim();
                if(!newName.isEmpty())
                {
                    shoe.setName(newName);
                }

                
                double newPrice = shoe.getPrice();
                boolean validPrice = false;
                while (!validPrice) {
                    System.out.print("Nhap gia moi (bo trong de giu nguyen): ");
                    String newPriceStr = scanner.nextLine().trim();
                    if (newPriceStr.isEmpty()) {
                        validPrice = true;
                    } else {
                        try {
                            newPrice = Double.parseDouble(newPriceStr);
                            validPrice = true;
                        } catch (NumberFormatException e) {
                            System.out.println("Gia giay khong hop le! Vui long nhap lai gia giay.");
                        }
                    }
                }
                shoe.setPrice(newPrice);

                System.out.print("Nhap mau moi (bo trong de giu nguyen): ");
                String newColor = scanner.nextLine().trim();
                if(!newColor.isEmpty())
                {
                    shoe.setColor(newColor);
                }

                
                int newQuantity = shoe.getQuantity();
                boolean validQuantity = false;
                while (!validQuantity) {
                    System.out.print("Nhap so luong moi (bo trong de giu nguyen): ");
                    String newQuantityStr = scanner.nextLine().trim();
                    if (newQuantityStr.isEmpty()) {
                        validQuantity = true;
                    } else {
                        try {
                            newQuantity = Integer.parseInt(newQuantityStr);
                            validQuantity = true;
                        } catch (NumberFormatException e) {
                            System.out.println("So luong giay khong hop le! Vui long nhap lai so luong.");
                        }
                    }
                }
                shoe.setQuantity(newQuantity);

                ghidulieu();
                System.out.println("Da sua thong tin cua giay co id : " + id + " thanh cong.");
            }
        }
        if(!found)
        {
            System.out.println("Khong tim thay giay co id " + id);
        }
    }

    //XÓA GIÀY
    @Override
    public void xoa()
    {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhap id giay can xoa: ");
        String id = scanner.nextLine().trim();

        boolean found = false;
        for (int i = 0; i < danhSachGiay.size(); i++)
        {
            if(danhSachGiay.get(i).getId().equalsIgnoreCase(id))
            {
                danhSachGiay.remove(i);
                System.out.println("Da xoa giay co id: " + id + " thanh cong.");
                found = true;
                break;
            }
        }

        if(!found)
        {
            System.out.println("Khong tim thay id " + id);
        }

        ghidulieu();
    }

    //TÌM KIẾM GIÀY
    @Override
    public void timkiem()
    {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhap id giay can tim kiem: ");
        String id = scanner.nextLine().trim();

        boolean found = false;
        for(Shoe shoe : danhSachGiay)
        {
            if(shoe.getId().equalsIgnoreCase(id))
            {
                System.out.println("Da tim thay giay co id: " + id);
                shoe.displayInfo();
                found = true;
                break;
            }
        }
        if (!found)
            {
                System.out.println("Khong tim thay giay voi id " + id);
            }
    }

    //HÀM TÌM GIÀY ĐỂ TẠO HÓA ĐƠN
    public  Shoe SearchForBill(String id)
    {
        
        boolean found = false;
        for (Shoe shoe : danhSachGiay)
        {
            if (shoe.getId().equalsIgnoreCase(id))
            {
                System.out.println("Da tim thay giay co id: " + id);
                shoe.displayInfo();
                found = true;
                return shoe;
            }
        }
        if (!found)
        {
            System.out.println("Khong tim thay giay voi id " + id);
        }
        System.out.println("Danh sach giay: ");
        hiendanhsach();
        return null;
    }

    @Override
    public void hiendanhsach()
    {
        System.out.println("._____________________________________________________________________________________________________.");
        System.out.printf("| %-7s | %-45s | %-10s | %-15s | %-10s |%n",
                         "ID", "TEN GIAY", "GIA", "MAU SAC", "SO LUONG");
        System.out.println("|_____________________________________________________________________________________________________|");

        for (Shoe shoe : danhSachGiay)
        {
            System.out.printf("| %-7s | %-45s | %-10.2f | %-15s | %-10d |%n",
                                shoe.getId(), shoe.getName(), shoe.getPrice(),
                                shoe.getColor(), shoe.getQuantity());
            
        }
        System.out.println("|_____________________________________________________________________________________________________|");
    }

    //ĐẾM SỐ MẪU ĐANG CÓ CỦA MỖI LOẠI
    public static void DemSoMau(QuanLyGiay quanLiGiay, String shoeType){
        int totalCount = 0;
        for (Shoe shoe : quanLiGiay.danhSachGiay) {
            if (shoe.getId().startsWith(shoeType)) {
                totalCount++;
            }
        }
        System.out.println("So mau giay cua " + shoeType + " hien co la: " + totalCount);
    }
}
