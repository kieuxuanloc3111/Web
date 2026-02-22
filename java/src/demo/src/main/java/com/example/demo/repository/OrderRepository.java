package com.example.demo.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import com.example.demo.entity.Order;
import com.example.demo.dto.OrderDTO;

import java.math.BigDecimal;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    // 1️⃣ LẤY ORDER + USER NAME
    @Query("""
        SELECT new com.example.demo.dto.OrderDTO(
            o.id,
            o.user.name,
            o.total
        )
        FROM Order o
    """)
    List<OrderDTO> getOrdersWithUserName();


    // 2️⃣ USER CÓ TOTAL ORDER > X
    @Query("""
        SELECT o.user.id,
               COUNT(o),
               SUM(o.total)
        FROM Order o
        GROUP BY o.user.id
        HAVING SUM(o.total) > :amount
    """)
    List<Object[]> getUserTotalGreaterThan(@Param("amount") BigDecimal amount);


    // 3️⃣ TỔNG DOANH THU
    @Query("SELECT SUM(o.total) FROM Order o")
    BigDecimal totalRevenue();

}