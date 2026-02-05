package src.demo;
public class Main {

    public static void main(String[] args) {
        b1();

        b2();
        b3();
    }
    public static void b1(){
        String name = "loc";
        int age = 20;
        double height = 1.62;
        boolean haveWork = false;

        System.out.println(name);
        System.out.println(age);
        System.out.println(haveWork);
        System.out.println(height);
    }
    public static void b2() {
        double score = 9.8;
        int a = (int) score;
        System.out.println(a); 
    }

    public static void b3() {
        final double PI = 3.14;
        System.out.println(PI);
    }
}
