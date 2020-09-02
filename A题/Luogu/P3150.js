function P3150(n) {
    if (n % 2 === 0) {
        console.log("pb wins");
    } else {
        console.log("zs wins");
    }
}
let a = [1, 3, 7, 20, 5]
for (let i = 0;i < 5; i ++) {
    P3150(a[i])
}