const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function kiemTraTheKy(nam) {
    const so = parseInt(nam);

    if (isNaN(so)) {
        console.log("Vui lòng nhập một năm hợp lệ!");
        return;
    }

    if (so < 1900) {
        console.log("Năm thuộc thế kỷ 18");
    } else if (so >= 1900 && so <= 1999) {
        console.log("Năm thuộc thế kỷ 19");
    } else if (so >= 2000 && so <= 2099) {
        console.log("Năm thuộc thế kỷ 20");
    } else if (so >= 2100) {
        console.log("Năm thuộc thế kỷ 21 trở lên");
    }
}

function nhapNam() {
    rl.question("Nhập năm: ", (nam) => {
        const input = nam.trim().toLowerCase();

        if (input === "") {
            console.log("⚠️  Bạn chưa nhập năm nào!");
        } else if (input === "thoát") {
            console.log("Tạm biệt!");
            rl.close();
            return;
        } else {
            kiemTraTheKy(input);
        }

        nhapNam(); 
    });
}

nhapNam();