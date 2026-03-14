package view;

import model.Product;

import java.util.List;

public class ProductView {

    public void showMenu() {
        System.out.println("1. Add product");
        System.out.println("2. Delete product");
        System.out.println("3. Find product");
        System.out.println("4. Filter by price");
        System.out.println("5. Show all");
        System.out.println("0. Exit");
    }

    public void showProducts(List<Product> products) {
        for (Product p : products) {
            System.out.println(p);
        }
    }

    public void showProduct(Product product) {
        if (product == null) {
            System.out.println("Product not found");
        } else {
            System.out.println(product);
        }
    }
}