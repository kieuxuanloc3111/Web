package view;
import java.util.Scanner;
import model.User;

import java.util.List;
import java.util.Scanner;
public class UserView {
    private Scanner scanner = new Scanner(System.in);
    public int showMenu() {
        System.out.println("\n===== USER MANAGEMENT =====");
        System.out.println("1. Add user");
        System.out.println("2. Delete user");
        System.out.println("3. Find user by email");
        System.out.println("4. Get users by role");
        System.out.println("5. Filter by age");
        System.out.println("6. Count by role");
        System.out.println("7. Show all");
        System.out.println("8. Sort by age");          
        System.out.println("9. Oldest user");       
        System.out.println("0. Exit");
        System.out.println("0. Exit");

        System.out.print("Choose: ");
        return Integer.parseInt(scanner.nextLine());
    }

    public User inputUser() {

        System.out.print("Enter id: ");
        int id = Integer.parseInt(scanner.nextLine());

        System.out.print("Enter name: ");
        String name = scanner.nextLine();

        System.out.print("Enter email: ");
        String email = scanner.nextLine();

        System.out.print("Enter age: ");
        int age = Integer.parseInt(scanner.nextLine());

        System.out.print("Enter role (ADMIN/USER): ");
        String role = scanner.nextLine();

        return new User(id, name, email, age, role);
    }

    public int inputId() {
        System.out.print("Enter id: ");
        return Integer.parseInt(scanner.nextLine());
    }

    public String inputEmail() {
        System.out.print("Enter email: ");
        return scanner.nextLine();
    }

    public String inputRole() {
        System.out.print("Enter role: ");
        return scanner.nextLine();
    }

    public int inputAge() {
        System.out.print("Enter age: ");
        return Integer.parseInt(scanner.nextLine());
    }

    public void showUsers(List<User> users) {
        if (users.isEmpty()) {
            System.out.println("Empty list");
        } else {
            users.forEach(System.out::println);
        }
    }

    public void showUser(User user) {
        System.out.println(user);
    }

    public void showMessage(String message) {
        System.out.println(message);
    }
}
