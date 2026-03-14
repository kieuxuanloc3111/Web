package controller;

import model.Product;
import service.ProductService;
import view.ProductView;

import java.util.List;
import java.util.Scanner;

public class ProductController {

    private ProductService productService = new ProductService();
    private ProductView productView = new ProductView();
    private Scanner scanner = new Scanner(System.in);

    public void start() {

        while (true) {

            productView.showMenu();
            int choice = Integer.parseInt(scanner.nextLine());

            switch (choice) {

                case 1:
                    addProduct();
                    break;

                case 2:
                    deleteProduct();
                    break;

                case 3:
                    findProduct();
                    break;

                case 4:
                    filterProduct();
                    break;

                case 5:
                    productView.showProducts(productService.getAll());
                    break;

                case 0:
                    return;
            }
        }
    }

    private void addProduct() {

        System.out.println("Enter id:");
        int id = Integer.parseInt(scanner.nextLine());

        System.out.println("Enter name:");
        String name = scanner.nextLine();

        System.out.println("Enter price:");
        double price = Double.parseDouble(scanner.nextLine());

        Product product = new Product(id, name, price);

        productService.addProduct(product);
    }

    private void deleteProduct() {

        System.out.println("Enter id:");
        int id = Integer.parseInt(scanner.nextLine());

        productService.deleteProduct(id);
    }

    private void findProduct() {

        System.out.println("Enter id:");
        int id = Integer.parseInt(scanner.nextLine());

        Product product = productService.findById(id);

        productView.showProduct(product);
    }

    private void filterProduct() {

        System.out.println("Enter price:");
        double price = Double.parseDouble(scanner.nextLine());

        List<Product> products = productService.filterByPrice(price);

        productView.showProducts(products);
    }
}