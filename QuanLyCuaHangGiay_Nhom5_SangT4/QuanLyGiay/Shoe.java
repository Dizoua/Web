package QuanLyGiay;
public abstract class Shoe {
    private String id;
    private String name;
    private double price;
    private String color;
    private int quantity;

    // Constructor
    public Shoe(String id, String name, double price, String color, int quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.color = color;
        this.quantity = quantity;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getColor() { return color; }
    public int getQuantity() { return quantity; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setPrice(double price) { this.price = price; }
    public void setColor(String color) { this.color = color; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public abstract void displayInfo();
}
