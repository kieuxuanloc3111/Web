package com.example;
import com.example.dao.OrderDAO;
public class TestGroupBy {
    public static void main(String[] args) {

        OrderDAO dao = new OrderDAO();

        System.out.println("=== Count order by user ===");
        dao.countOrderByUser().forEach(System.out::println);

        System.out.println("\n=== Sum order by user ===");
        dao.sumOrderByUser().forEach(System.out::println);

        System.out.println("\n=== Full stat by user ===");
        dao.orderStatByUser().forEach(System.out::println);

        System.out.println("\n=== User total > 1000 ===");
        dao.userTotalGreaterThan(1000).forEach(System.out::println);

        System.out.println("\n=== Total revenue ===");
        System.out.println(dao.totalRevenue());
    }
}

