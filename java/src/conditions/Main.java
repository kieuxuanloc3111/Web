package src.conditions;

public class Main {
    public static void main(String[] args) {
        b1(26);
        b2(20);
        b3(10);
        b4("admin");
    }

    public static void b1(int age) {
        if (age < 18) {
            System.out.println("tre em");
        } else if (age >= 18 && age <= 22) {
            System.out.println("sinh vien");
        } else {
            System.out.println("di lam");
        }
    }

    public static void b2(int num) {
        for (int i = 1; i <= num; i++) {
            if (i % 2 == 0) {
                System.out.println(i);
            }
        }
    }

    public static void b3(int num) {
        while (num > 0) {
            if (num != 5) {
                System.out.println(num);
            }
            num--; 
        }
    }

    public static void b4(String role) {
        switch (role) {
            case "admin":
                System.out.println("Toan quyen");
                break;
            case "user":
                System.out.println("Nguoi dung");
                break;
            default:
                System.out.println("Vai tro khong hop le");
        }
    }
}
