package com.example.dto;

public class UserOrderStatDTO {
    private int userId;
    private long orderCount;
    private double totalAmount;

    public UserOrderStatDTO(int userId, long orderCount, double totalAmount) {
        this.userId = userId;
        this.orderCount = orderCount;
        this.totalAmount = totalAmount;
    }

    public int getUserId() {
        return userId;
    }

    public long getOrderCount() {
        return orderCount;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    @Override
    public String toString() {
        return "User " + userId +
                " | Orders: " + orderCount +
                " | Total: " + totalAmount;
    }
}
