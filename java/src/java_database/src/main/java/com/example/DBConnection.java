package com.example;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    public static Connection getConnection() {
        try {
        String url =
            "jdbc:sqlserver://localhost:1433;"
          + "databaseName=demo_java;"
          + "encrypt=true;"
          + "trustServerCertificate=true";

        String user = "sa";
        String password = "12345678";


            return DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
