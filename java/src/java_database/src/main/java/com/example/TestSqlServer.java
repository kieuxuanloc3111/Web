package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import com.example.DBConnection;
public class TestSqlServer {
    public static void main(String[] args) {
        // String sql = "SELECT * FROM users";

        // try (Connection conn = DBConnection.getConnection()) {

        //     // 1. INSERT
        //     String insertSql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
        //     PreparedStatement insertPs = conn.prepareStatement(insertSql);
        //     insertPs.setString(1, "Lộc");
        //     insertPs.setString(2, "loc@gmail.com");
        //     insertPs.setInt(3, 23);
        //     insertPs.executeUpdate();

        //     System.out.println("✅ Insert thành công");

        //     // 2. SELECT
        //     String selectSql = "SELECT * FROM users";
        //     PreparedStatement selectPs = conn.prepareStatement(selectSql);
        //     ResultSet rs = selectPs.executeQuery();

        //     System.out.println("----- USERS -----");
        //     while (rs.next()) {
        //         System.out.println(
        //             rs.getInt("id") + " | " +
        //             rs.getString("name") + " | " +
        //             rs.getString("email") + " | " +
        //             rs.getInt("age")
        //         );
        //     }

        // } catch (Exception e) {
        //     e.printStackTrace();
        // }
        selectById(3);
        selectByAge(23);
        selectByEmail("an@gmail.com");
        // updateEmailById(4, "loc1@gmail.com");
    }

    public static void selectById(int id) {
        String sql = "SELECT * FROM users WHERE id = ?";

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                System.out.println(
                    rs.getInt("id") + " | " +
                    rs.getString("name") + " | " +
                    rs.getString("email") + " | " +
                    rs.getInt("age")
                );
            } else {
                System.out.println("Không tìm thấy user id = " + id);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void selectByAge(int age){
        String sql = "SELECT * FROM users WHERE age >=?";
        try(Connection connection= DBConnection.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql)
           ){
            preparedStatement.setInt(1,age);
            ResultSet rs= preparedStatement.executeQuery();
            while (rs.next()) {
                System.out.println(
                rs.getInt("id") + " | " +
                rs.getString("name") + " | " +
                rs.getString("email") + " | " +
                rs.getInt("age")
                );
            }

        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void selectByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                System.out.println(
                    rs.getInt("id") + " | " +
                    rs.getString("name") + " | " +
                    rs.getString("email") + " | " +
                    rs.getInt("age")
                );
            } else {
                System.out.println("❌ Không có user với email: " + email);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void updateEmailById(int id, String newEmail) {
        String sql = "UPDATE users SET email = ? WHERE id = ?";

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setString(1, newEmail);
            ps.setInt(2, id);

            int row = ps.executeUpdate();
            System.out.println("✅ Số dòng update: " + row);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void deleteByAge(int age) {
        String sql = "DELETE FROM users WHERE age < ?";

        try (
            Connection conn = DBConnection.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
        ) {
            ps.setInt(1, age);

            int row = ps.executeUpdate();
            System.out.println("🗑️ Đã xóa: " + row + " user");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
