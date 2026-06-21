public class Pattern_A {
    public static void main(String[] args) {
        int i, j; // declare loop variables

        for (i = 1; i < 6; i++) {
            for (j = 1; j < 10; j++) {
                if (i == 1 && j == 5 || i == 2 && j == 4 || i == 2 && j == 6 || i== 3 && j >2 && i == 3 && j<8 || i == 4 && j== 2 || i == 4 && j == 8 || i ==5 && j==1 || i==5 && j ==9  ) {
                    System.out.print("* ");
                } else {
                    System.out.print("  "); // keep spacing consistent
                }
            }          
            System.out.println(); // move to next line after inner loop
        }
    }
}
