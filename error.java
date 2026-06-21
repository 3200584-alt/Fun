public class error {
    public static void main(String[] args) {
        // The underscores in 1_000_000 are just for readability 
        // and are completely valid in Java.
        for (int i = 1; i <= 1_000_000; i++) {
            System.err.println("Error message " + i);
        }
    }
}