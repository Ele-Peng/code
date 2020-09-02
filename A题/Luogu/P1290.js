function findDivisor(a, b) {
    let min = Math.min(a, b)
    let i = 2;
    for (; i <= min; i ++) {
        if (a % i === 0 && b % i === 0) {
            console.log(i);
            return true
        }
    }
    if (i > min) return false;
}

function P1290() {
    if (!findDivisor(24, 15)) {
        console.log("Ollie wins");
    } else {
        console.log("Stan wins");
    }
}