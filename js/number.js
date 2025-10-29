const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function kiemtraso(number) {
    if (so % 2 === 0) {
        if (so>100){
            console.log(`Đây là số chẵn và lớn hơn 100`);
        }
        else if(so<100){
            console.log(`Đây là số chẵn và nhỏ hơn 100`);
        }

    } else {
        console.log(`Đây là số lẻ`);
    }
}
function nhapSo() {
    rl.question("Nhập số: ", (so) => {
        if (so.trim() === "") {
            console.log("Bạn chưa nhập số nào!");
        } else if (so.toLowerCase().trim() === "thoát") {
            console.log("Tạm biệt!");
            rl.close();
            return;
        } else {
            kiemtraso(so);
        }
        nhapSo(); 
    });
}
nhapSo()