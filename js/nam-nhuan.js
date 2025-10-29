const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function kiemTraNam(nam) {
    const so = parseInt(nam);

    if ((so % 400 === 0) || (so % 4 === 0 && so % 100 !== 0)) {
        console.log(`Đây là năm nhuận `);
    } else {
        console.log(`Đây không phải là năm nhuận `);
    }
}

function nhapNam() {
    rl.question("Nhập năm: ", (nam) => {
        if (nam.trim() === "") {
            console.log("Bạn chưa nhập năm nào!");
        } else if (nam.toLowerCase().trim() === "thoát") {
            console.log("Tạm biệt!");
            rl.close();
            return;
        } else {
            kiemTraNam(nam);
        }
        nhapNam(); 
    });
}

nhapNam();