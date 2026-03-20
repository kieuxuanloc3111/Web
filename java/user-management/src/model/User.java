package model;
public class User {
    private int id;
    private String name;
    private String email;
    private int age;
    private String role;

    public User(int id , String name , String email , int age, String role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.role = role;
    }
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public int getAge() {
        return age;
    }

    public String getRole() {
        return role;
    }
    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return id + " - " + name + " - " + email + " - " + age + " - " + role;
    }

}
