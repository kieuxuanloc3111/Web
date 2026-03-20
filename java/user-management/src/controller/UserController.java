package controller;

import model.User;
import service.UserService;
import view.UserView;

import java.util.Map;

public class UserController {

    private UserService service = new UserService();
    private UserView view = new UserView();

    public void start() {

        while (true) {

            try {
                int choice = view.showMenu();

                switch (choice) {

                    case 1:
                        User user = view.inputUser();
                        service.addUser(user);
                        view.showMessage("Add success!");
                        break;

                    case 2:
                        int id = view.inputId();
                        service.deleteUser(id);
                        view.showMessage("Delete success!");
                        break;

                    case 3:
                        String email = view.inputEmail();
                        view.showUser(service.findUserByEmail(email));
                        break;

                    case 4:
                        String role = view.inputRole();
                        view.showUsers(service.getUsersByRole(role));
                        break;

                    case 5:
                        int age = view.inputAge();
                        view.showUsers(service.filterUserByAge(age));
                        break;

                    case 6:
                        Map<String, Long> map = service.countUserByRole();
                        map.forEach((k, v) -> System.out.println(k + ": " + v));
                        break;

                    case 7:
                        view.showUsers(service.getAll());
                        break;
                    case 8:
                        view.showUsers(service.sortByAge());
                        break;

                    case 9:
                        view.showUser(service.getOldestUser());
                        break;
                    case 0:
                        return;

                    default:
                        view.showMessage("Invalid choice!");
                }

            } catch (Exception e) {
                view.showMessage("Error: " + e.getMessage());
            }
        }
    }
}