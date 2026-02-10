package src.oop;

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("loc", 23, 9.9);
        Student s2 = new Student("bao", 43, 9.9);
        s1.setScore(10);

        System.out.println(s1.getName());
        System.out.println(s1.getAge());
        System.out.println(s1.getScore());
        System.out.println(s2.getName());
        System.out.println(s2.getAge());
        System.out.println(s2.getScore());

        Developer de = new Developer("loc",99,"java");
        de.work();
    }
}
