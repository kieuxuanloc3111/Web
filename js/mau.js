const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function kiemTraMau(mau) {
    const mauLower = mau.toLowerCase().trim();

    if (mauLower === "xanh") {
        console.log("đây là màu xanh");
    } else if (mauLower === "đỏ") {
        console.log("đây là màu đỏ");
    } else if (mauLower === "vàng") {
        console.log("đây là màu vàng");
    } else {
        console.log("đây không phải màu xanh");
    }
}

function nhapMau() {
    rl.question("Nhập màu: ", (mau) => {
        if (mau.trim() === "") {
            console.log("Bạn chưa nhập màu nào!");
        } else {
            kiemTraMau(mau);
        }
        nhapMau(); // Gọi lại để lặp
    });
}

nhapMau();
// console.log("Bạn chưa nhập màu nào!");

