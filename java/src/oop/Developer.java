package src.oop;

public class Developer extends Employee{
    protected String language;
    public Developer(String name, double salary, String language){
        this.name = name;
        this.salary = salary;
        this.language = language;
    }
    @Override
    public void work(){
        System.out.println("code");
    }
}