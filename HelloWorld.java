import java.util.Scanner;

public class HelloWorld {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("===== STUDENT INFORMATION SYSTEM =====");

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        System.out.print("Enter your marks (out of 100): ");
        int marks = sc.nextInt();

        System.out.println("\n===== RESULT =====");
        System.out.println("Name  : " + name);
        System.out.println("Age   : " + age);
        System.out.println("Marks : " + marks);

        if (marks >= 90) {
            System.out.println("Grade : A+");
        } else if (marks >= 75) {
            System.out.println("Grade : A");
        } else if (marks >= 60) {
            System.out.println("Grade : B");
        } else if (marks >= 40) {
            System.out.println("Grade : C");
        } else {
            System.out.println("Grade : F");
        }

        if (age >= 18) {
            System.out.println("Status: Eligible for voting.");
        } else {
            System.out.println("Status: Not eligible for voting.");
        }

        System.out.println("\nThank you for using the Student Information System!");

        sc.close();
    }
}