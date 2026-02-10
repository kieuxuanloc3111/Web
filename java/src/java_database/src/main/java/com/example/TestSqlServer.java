package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import com.example.DBConnection;
public class TestSqlServer {
    public static void main(String[] args) {
        String sql = "SELECT * FROM users";

        try (Connection conn = DBConnection.getConnection()) {

            // 1. INSERT
            String insertSql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
            PreparedStatement insertPs = conn.prepareStatement(insertSql);
            insertPs.setString(1, "Lộc");
            insertPs.setString(2, "loc@gmail.com");
            insertPs.setInt(3, 23);
            insertPs.executeUpdate();

            System.out.println("✅ Insert thành công");

            // 2. SELECT
            String selectSql = "SELECT * FROM users";
            PreparedStatement selectPs = conn.prepareStatement(selectSql);
            ResultSet rs = selectPs.executeQuery();

            System.out.println("----- USERS -----");
            while (rs.next()) {
                System.out.println(
                    rs.getInt("id") + " | " +
                    rs.getString("name") + " | " +
                    rs.getString("email") + " | " +
                    rs.getInt("age")
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        selectById(3);
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
                System.out.println("❌ Không tìm thấy user id = " + id);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
