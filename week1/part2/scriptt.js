//blocking because hello 1 will alwaya run before hello 2 and hello 2 will always run before hello 3

console.log("hello 1");
console.log("hello 2");
console.log("hello 3");


//non-blocking because setTimeout is not blocking the "hello 6" message from logging to console right after hello 4

console.log("hello 4");

setTimeout(function() {
    console.log("hello 5");
}, 2000);

console.log("hello 6");



