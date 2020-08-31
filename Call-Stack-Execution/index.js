function foo(b) {
  var a = 5;
  return a * b + 10;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(6)); // 100

// -------------

function foo1() {
  throw new Error("Oops!");
}

function bar1() {
  foo1();
}

function baz1() {
  bar1();
}

baz1(); // error
