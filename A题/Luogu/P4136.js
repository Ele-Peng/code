function P4136(n) {
    let steps = n * n - 1;
    if (steps % 2 === 1) {
        console.log("Alice");
    } else {
        console.log("Bob");
    }
}