package service;

import model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProductService {

    private List<Product> products = new ArrayList<>();

    // add product
    public void addProduct(Product product) {
        products.add(product);
    }

    // delete product
    public void deleteProduct(int id) {
        products.removeIf(p -> p.getId() == id);
    }

    // find product
    public Product findById(int id) {
        for (Product p : products) {
            if (p.getId() == id) {
                return p;
            }
        }
        return null;
    }

    // filter by price
    public List<Product> filterByPrice(double price) {
        return products.stream()
                .filter(p -> p.getPrice() >= price)
                .collect(Collectors.toList());
    }

    public List<Product> getAll() {
        return products;
    }
}