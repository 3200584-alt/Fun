import java.util.Scanner;
class AdvanceSwitch{
    public static void main(String[] args) {
        Scanner data=new Scanner(System.in);
        System.out.println("ENTER SUMMER OR WINTER OR RAINY OR SPRING      ");
        System.out.println(" I WILL SAY WHAT SHOULD YOU DO NOWWWW");
        String season=data.nextLine().toUpperCase();
        switch (season) {
            case "SUMMER" -> System.out.println("wear Sunglasses");
            case "WINTER" -> System.out.println("wear hoddie");
            case "SPRING" -> System.out.println("go for Garden flowers are beautiful");
            case "Rainy" -> System.out.println("take umbrella");
            default -> System.out.println("enter valid season");
        }
    }
}