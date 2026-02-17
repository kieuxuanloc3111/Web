package com.example;
import java.util.List;

import com.example.dao.OrderDAO;
import com.example.dto.OrderDTO;
import com.example.model.User;
public class Test {
    public static void main(String[] args) {

        OrderDAO dao = new OrderDAO();

        System.out.println("=== User  ===");
        List<User> user= dao.getAllUsers();
        for (int i=0; i<user.size();i++){
            User u= user.get(i);
            System.out.println(u.getName());
        }

        System.out.println("=== Orders + User ===");

        List<OrderDTO> list = dao.getOrdersWithUserName();

        for (int i = 0; i < list.size(); i++) {
            OrderDTO dto = list.get(i);
            System.out.println(dto);
            // System.out.println(dto.getOrderId());
        }

        System.out.println("=== User wwith order great than 500 ===");
        List<User> users1 = dao.getUserTotalGreaterThan(500);

        for (int i = 0; i < users1.size(); i++) {
            User u = users1.get(i);
            System.out.println(u.getId() + " | " + u.getName());
        }

        System.out.println("=== User without order  ===");
        List<User> user2= dao.getUserWithoutOrder();
        for (int i=0; i<user2.size();i++){
            User u= user2.get(i);
            System.out.println(u.getId() + " | " +u.getName() + " | " + u.getEmail());
        }

    }
}

