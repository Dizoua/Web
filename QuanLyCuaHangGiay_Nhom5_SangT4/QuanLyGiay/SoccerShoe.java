package QuanLyGiay;
public class SoccerShoe extends Shoe {
    private static int count = 0;

    // Constructor
    public SoccerShoe(String name, double price, String color, int quantity) {
        super("BD" + String.format("%03d", ++count), name, price, color, quantity);
    }

    public static void ResetCount() {
        count = 0;
    }

    @Override
    public void displayInfo() {
        System.out.printf("| ID: %s | Name: %s | Price: %.2f | Color: %s | Quantity: %d |\n",
                          getId(), getName(), getPrice(), getColor(), getQuantity());
    }
    
}
