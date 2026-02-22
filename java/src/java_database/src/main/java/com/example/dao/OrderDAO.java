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
            SELECT user_id,
                COUNT(*) AS order_count,
                SUM(total) AS totalAmount
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
                        rs.getDouble("totalAmount")
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
    public boolean createOrderWithPayment(int userId, double amount) {

        String updateBalanceSql = """
            UPDATE users
            SET balance = balance - ?
            WHERE id = ? AND balance >= ?
        """;

        String insertOrderSql = """
            INSERT INTO orders (user_id, total)
            VALUES (?, ?)
        """;

        try (Connection conn = DBConnection.getConnection()) {

            // 🔥 TẮT AUTO COMMIT
            conn.setAutoCommit(false);

            try (
                PreparedStatement updatePs = conn.prepareStatement(updateBalanceSql);
                PreparedStatement insertPs = conn.prepareStatement(insertOrderSql);
            ) {

                /* ===== 1️⃣ Trừ tiền ===== */
                updatePs.setDouble(1, amount);
                updatePs.setInt(2, userId);
                updatePs.setDouble(3, amount);

                int updatedRows = updatePs.executeUpdate();

                if (updatedRows == 0) {
                    // Không đủ tiền hoặc user không tồn tại
                    conn.rollback();
                    System.out.println("❌ Không đủ tiền hoặc user không tồn tại");
                    return false;
                }

                /* ===== 2️⃣ Tạo order ===== */
                insertPs.setInt(1, userId);
                insertPs.setDouble(2, amount);

                insertPs.executeUpdate();

                /* ===== 3️⃣ Commit ===== */
                conn.commit();
                System.out.println("✅ Tạo order thành công");
                return true;

            } catch (Exception e) {
                conn.rollback();
                System.out.println("❌ Lỗi xảy ra → rollback");
                e.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public List<Order> getOrdersOrderByTotalDesc() {
        List<Order> list = new ArrayList<>();

        String sql = """
            SELECT id, user_id, total
            FROM orders
            ORDER BY total DESC
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
        ) {
            while (rs.next()) {
                Order o = new Order();
                o.setId(rs.getInt("id"));
                o.setUserId(rs.getInt("user_id"));
                o.setTotal(rs.getDouble("total"));

                list.add(o);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    public List<User> getUsersOrderByAgeAsc() {
        List<User> list = new ArrayList<>();

        String sql = """
            SELECT id, name, email, age
            FROM users
            ORDER BY age ASC
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
    public List<Order> getTopOrders(int limit) {
        List<Order> list = new ArrayList<>();

        String sql = """
            SELECT id, user_id, total
            FROM orders
            ORDER BY total DESC
            LIMIT ?
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setInt(1, limit);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Order o = new Order();
                o.setId(rs.getInt("id"));
                o.setUserId(rs.getInt("user_id"));
                o.setTotal(rs.getDouble("total"));

                list.add(o);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    public List<Order> getOrdersByTotalBetween(double min, double max) {
        List<Order> list = new ArrayList<>();

        String sql = """
            SELECT id, user_id, total
            FROM orders
            WHERE total BETWEEN ? AND ?
            ORDER BY total
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setDouble(1, min);
            ps.setDouble(2, max);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Order o = new Order();
                o.setId(rs.getInt("id"));
                o.setUserId(rs.getInt("user_id"));
                o.setTotal(rs.getDouble("total"));

                list.add(o);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
    public List<User> getUsersByAgeBetween(int minAge, int maxAge) {
        List<User> list = new ArrayList<>();

        String sql = """
            SELECT id, name, email, age
            FROM users
            WHERE age BETWEEN ? AND ?
            ORDER BY age
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setInt(1, minAge);
            ps.setInt(2, maxAge);

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

    public List<UserOrderStatDTO> getTopUsersBySpending(int limit) {
        List<UserOrderStatDTO> list = new ArrayList<>();

        String sql = """
            SELECT user_id,
                COUNT(*) AS order_count,
                SUM(total) AS total_amount
            FROM orders
            GROUP BY user_id
            ORDER BY total_amount DESC
            LIMIT ?
        """;

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setInt(1, limit);

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
}