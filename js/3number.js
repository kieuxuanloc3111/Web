const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let mangSo = []; 

function nhapSoThu(i) {
    rl.question(`Nhập số thứ ${i + 1} (1 - 10): `, (input) => {
        let so = parseInt(input);

        if (isNaN(so) || so < 1 || so > 10) {
            console.log("⚠️  Vui lòng nhập số nguyên trong khoảng 1 đến 10!");
            nhapSoThu(i); // nhập lại cùng vị trí
            return;
        }

        mangSo.push(so);

        if (mangSo.length < 3) {
            nhapSoThu(mangSo.length); // nhập tiếp
        } else {
            kiemTraDanhGia(); // đủ 3 số thì kiểm tra
            rl.close();
        }
    });
}

function kiemTraDanhGia() {
    console.log(`Ba số bạn nhập là: [${mangSo.join(", ")}]`);

    console.log(mangSo)

    if (mangSo.includes(1)) {
        console.log("loại");
        return;
    }
    let nhohon5 = false;

    for (let i = 0; i < mangSo.length; i++) {
        if (mangSo[i] < 5) {
            nhohon5 = true;
            console.log("yếu");
            return;
        }
    }

    let tong = 0;
    for (let i = 0; i < mangSo.length; i++) {
        tong += mangSo[i];
    }

    let tbc = tong / mangSo.length;

    if (tbc < 7) {
        console.log("trung bình");
    } else if (tbc >= 7 && tbc <= 8) {
        console.log("khá");
    } else {
        console.log("giỏi");
    }
}

nhapSoThu(0);
