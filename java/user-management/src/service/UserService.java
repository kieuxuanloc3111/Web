package service;

import exception.DuplicateEmailException;
import exception.UserNotFoundException;
import model.User;

import java.util.*;
import java.util.stream.Collectors;
public class UserService {
    private List<User> users= new ArrayList<>();
    private Set<String> emails = new HashSet<>();
    private Map<String, List<User>> userByRole = new HashMap<>();

    public void addUser(User user){
        if(emails.contains(user.getEmail())){
            throw new DuplicateFormatFlagsException("email already exist");
        }

        if(user.getAge() <=0){
            throw new IllegalArgumentException("age must > 0");
        }

                // validate role
        if (!user.getRole().equals("ADMIN") && !user.getRole().equals("USER")) {
            throw new IllegalArgumentException("Invalid role");
        }
        users.add(user);
        emails.add(user.getEmail());

        userByRole.putIfAbsent(user.getRole(), new ArrayList<>());
        userByRole.get(user.getRole()).add(user);

    }

    public void deleteUser(int id){
        User user = users.stream().filter(u -> u.getId()==id).findFirst().orElseThrow(() -> new UserNotFoundException("User not found"));
        users.remove(user);
        userByRole.get(user.getRole()).remove(user);
    }

        public User findUserByEmail(String email) {

        return users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public List<User> getUsersByRole(String role) {
        return userByRole.getOrDefault(role, new ArrayList<>());
    }

    public List<User> filterUserByAge(int age) {
        return users.stream()
                .filter(u -> u.getAge() > age)
                .toList();
    }

    public Map<String, Long> countUserByRole() {
        return users.stream()
                .collect(Collectors.groupingBy(User::getRole, Collectors.counting()));
    }


    public List<User> getAll() {
        return users;
    }

    public List<User> sortByAge() {
    return users.stream()
            .sorted(Comparator.comparing(User::getAge))
            .toList();
    }
    public User getOldestUser() {
    return users.stream()
            .max(Comparator.comparing(User::getAge))
            .orElse(null);
    }
    public void updateUser(int id, User newUser) {

    User oldUser = users.stream()
            .filter(u -> u.getId() == id)
            .findFirst()
            .orElseThrow(() -> new UserNotFoundException("User not found"));

    // update email set
    emails.remove(oldUser.getEmail());
    if (emails.contains(newUser.getEmail())) {
        throw new DuplicateEmailException("Email exists");
    }

    // update list
    users.remove(oldUser);
    users.add(newUser);

    emails.add(newUser.getEmail());
    }
}
