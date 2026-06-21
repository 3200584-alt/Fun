import java.awt.*;
import javax.swing.*;

public class Rainbow extends JPanel {
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        
        Color[] colors = {
            Color.RED,
            Color.ORANGE,
            Color.YELLOW,
            Color.GREEN,
            Color.BLUE,
            new Color(75, 0, 130),   
            new Color(143, 0, 255)   
        };

        int x = 50;   
        int y = 200;  
        int width = 400;
        int height = 200;

        
        for (int i = 0; i < colors.length; i++) {
            g.setColor(colors[i]);
            g.drawArc(x, y, width, height, 0, 180);
            x += 10;
            y += 10;
            width -= 20;
            height -= 10;
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Rainbow Display");
        Rainbow rainbow = new Rainbow();
        frame.add(rainbow);
        frame.setSize(500, 400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}

