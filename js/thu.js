for(let i=1;i<=10;i++){

    console.log(i);
}

for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}

for (let i = 1; i <= 10; i++) {
    if (i<5){
        console.log(i)
    }
}

for (let i=1;i<=10;i++){
    if (i===6){
        console.log(i)
    }
}

let tong=0;
for(let i=1; i<=10;i++){
    tong +=i
}
console.log(tong)


let n = 5;
let s = 0;

for (let i = 1; i <= n; i++) {
    s += 1 / i;
}

console.log(s);

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