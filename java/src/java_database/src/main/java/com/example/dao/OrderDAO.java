package com.example.dao;

import com.example.dto.OrderDTO;
import com.example.dto.UserOrderStatDTO;
import com.example.model.Order;
import com.example.model.User;
import com.example.DBConnection;

import java.sql.*;
import java.util.*;


public class OrderDAO {
    /* ===============================
        all USER NAME
       =============================== */
    public List<User> getAllUsers() {
        List<User> list = new ArrayList<>();

        String sql = "SELECT id, name, email, age FROM users";

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {

            while (rs.next()) {
                User u = new User();
                u.setId(rs.getInt("id"));
                u.setName(rs.getString("name"));
                u.setEmail(rs.getString("email"));
                u.setAge(rs.getInt("age"));

                list.add(u);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    /* ===============================
       1️⃣ LẤY ORDER + USER NAME
       =============================== */
    public List<OrderDTO> getOrdersWithUserName() {
        List<OrderDTO> list = new ArrayList<>();

        String sql = """
            SELECT orders.id AS order_id,
                users.name,
                orders.total
            FROM orders
            JOIN users ON orders.user_id = users.id
        """;


        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {
            while (rs.next()) {
                list.add(new OrderDTO(
                        rs.getInt("order_id"),
                        rs.getString("name"),
                        rs.getDouble("total")
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    /* ===============================
       2️⃣ USER CÓ TOTAL ORDER > X
       =============================== */
    public List<User> getUserTotalGreaterThan(double amount) {
        List<User> list = new ArrayList<>();


        String sql = """
            SELECT users.id, users.name, users.email, users.age, SUM(orders.total) AS total_order
            FROM users 
            JOIN orders ON users.id = orders.user_id
            GROUP BY users.id, users.name, users.email, users.age
            HAVING SUM(orders.total) > ?
        """;
        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setDouble(1, amount);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                User u = new User();
                u.setId(rs.getInt("id"));
                u.setName(rs.getString("name"));
                u.setEmail(rs.getString("email"));
                u.setAge(rs.getInt("age"));

                list.add(u);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    /* ===============================
       3️⃣ USER CHƯA CÓ ORDER
       =============================== */
    public List<User> getUserWithoutOrder() {
        List<User> list = new ArrayList<>();

        String sql = """
            SELECT u.id, u.name, u.email, u.age
            FROM users u
            LEFT JOIN orders o ON u.id = o.user_id
            WHERE o.id IS NULL
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {
            while (rs.next()) {
                User u = new User();
                u.setId(rs.getInt("id"));
                u.setName(rs.getString("name"));
                u.setEmail(rs.getString("email"));
                u.setAge(rs.getInt("age"));

                list.add(u);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    public List<UserOrderStatDTO> countOrderByUser() {
        List<UserOrderStatDTO> list = new ArrayList<>();

        String sql = """
            SELECT user_id, COUNT(*) AS order_count
            FROM orders
            GROUP BY user_id
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {
            while (rs.next()) {
                list.add(new UserOrderStatDTO(
                        rs.getInt("user_id"),
                        rs.getLong("order_count"),
                        0
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    public List<UserOrderStatDTO> sumOrderByUser() {
        List<UserOrderStatDTO> list = new ArrayList<>();

        String sql = """
            SELECT user_id, SUM(total) AS total_amount
            FROM orders
            GROUP BY user_id
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {
            while (rs.next()) {
                list.add(new UserOrderStatDTO(
                        rs.getInt("user_id"),
                        0,
                        rs.getDouble("total_amount")
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    public List<UserOrderStatDTO> orderStatByUser() {
        List<UserOrderStatDTO> list = new ArrayList<>();

        String sql = """
            SELECT user_id,
                COUNT(*) AS order_count,
                SUM(total) AS total_amount
            FROM orders
            GROUP BY user_id
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {
            while (rs.next()) {
                list.add(new UserOrderStatDTO(
                        rs.getInt("user_id"),
                        rs.getLong("order_count"),
                        rs.getDouble("total_amount")
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    public List<UserOrderStatDTO> userTotalGreaterThan(double amount) {
        List<UserOrderStatDTO> list = new ArrayList<>();

        String sql = """
            SELECT user_id,
                COUNT(*) AS order_count,
                SUM(total) AS total_amount
            FROM orders
            GROUP BY user_id
            HAVING SUM(total) > ?
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setDouble(1, amount);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                list.add(new UserOrderStatDTO(
                        rs.getInt("user_id"),
                        rs.getLong("order_count"),
                        rs.getDouble("total_amount")
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    public double totalRevenue() {
        String sql = "SELECT SUM(total) FROM orders";

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {
            if (rs.next()) {
                return rs.getDouble(1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return 0;
    }

}