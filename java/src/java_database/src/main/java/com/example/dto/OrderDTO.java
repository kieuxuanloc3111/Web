package com.example.dto;

public class OrderDTO {
    private int orderId;
    private String userName;
    private double total;

    public OrderDTO(int orderId, String userName, double total) {
        this.orderId = orderId;
        this.userName = userName;
        this.total = total;
    }

    public int getOrderId() {
        return orderId;
    }

    public String getUserName() {
        return userName;
    }

    public double getTotal() {
        return total;
    }

    @Override
    public String toString() {
        return orderId + " | " + userName + " | " + total;
    }
}