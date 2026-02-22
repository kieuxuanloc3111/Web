package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo.service.OrderService;
import com.example.demo.dto.OrderDTO;

import java.util.List;
import java.math.BigDecimal;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // GET /orders
    @GetMapping
    public List<OrderDTO> getOrders() {
        return orderService.getOrdersWithUserName();
    }

    // GET /orders/revenue
    @GetMapping("/revenue")
    public BigDecimal getTotalRevenue() {
        return orderService.totalRevenue();
    }
}