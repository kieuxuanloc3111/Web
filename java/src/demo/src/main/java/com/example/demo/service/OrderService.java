package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.repository.OrderRepository;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.dto.OrderDTO;
import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderDTO> getOrdersWithUserName() {
        return orderRepository.getOrdersWithUserName();
    }

    public BigDecimal totalRevenue() {
        return orderRepository.totalRevenue();
    }

}