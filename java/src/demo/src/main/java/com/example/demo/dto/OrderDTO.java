package com.example.demo.dto;

import java.math.BigDecimal;

public class OrderDTO {

    private Integer orderId;
    private String userName;
    private BigDecimal total;

    public OrderDTO(Integer orderId, String userName, BigDecimal total) {
        this.orderId = orderId;
        this.userName = userName;
        this.total = total;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public String getUserName() {
        return userName;
    }

    public BigDecimal getTotal() {
        return total;
    }
}