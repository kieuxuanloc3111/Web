package com.example;
import com.example.dao.OrderDAO;
import com.example.dto.OrderDTO;
import com.example.model.User;
public class TestGroupBy {
    public static void main(String[] args) {

        OrderDAO dao = new OrderDAO();

        System.out.println("=== Orders + User ===");
        for (OrderDTO dto : dao.getOrdersWithUserName()) {
            System.out.println(dto);
        }

        System.out.println("\n=== User total > 500 ===");
        for (User u : dao.getUserTotalGreaterThan(500)) {
            System.out.println(u.getId() + " | " + u.getName());
        }
    }
}

