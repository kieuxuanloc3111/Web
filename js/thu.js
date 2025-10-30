function inTu1DenN(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

function inSoLe(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 2 !== 0) {
            console.log(i);
        }
    }
}

function inSoNhoHon5(n) {
    for (let i = 1; i <= n; i++) {
        if (i < 5) {
            console.log(i);
        }
    }
}

function inSoBang6(n) {
    for (let i = 1; i <= n; i++) {
        if (i === 6) {
            console.log(i);
        }
    }
}

function tinhTong(n) {
    let tong = 0;
    for (let i = 1; i <= n; i++) {
        tong += i;
    }
    console.log(`Tổng từ 1 đến ${n} là: ${tong}`);
}

function tinhTongPhanSo(n) {
    let s = 0;
    for (let i = 1; i <= n; i++) {
        s += 1 / i;
    }
    console.log(`Tổng S = ${s}`);
}

function timSoLonNhat(a, b, c) {
    let max;

    if (a >= b && a >= c) {
        max = a;
    } else if (b >= a && b >= c) {
        max = b;
    } else {
        max = c;
    }

    console.log("Số lớn nhất là: ",max);
}

timSoLonNhat(1,2,3);


giờ bạn tạo cho mình cái html , với mỗi hàm bạn cho 1 cái h1 mô tả : ví dụ : tính tổng từ 1 tới n , rồi làm 1 cái nút và 1 cái khung để nhập n, khi nhập n rồi bấm sẽ đưa ra kết 