# Call stack

`Call stack` is a dynamic data structure it also called `execution stack` or simply `stack`

## Javascript is a single threaded single concurrent language

meaning it can handle one task at a time or a piece of code at a time. It has a **single call stack** which along with other parts like `heap`, `queue` constitutes the Javascript Concurrency Model (implemented inside of V8)

## Examples on Call Stack

```js
function multiply(a, b) {
  return a * b;
}
function square(n) {
  return multiply(n, n);
}
console.log(square(2)); // the output will be 4
```

look at the gif below

![alt text](https://im5.ezgif.com/tmp/ezgif-5-774f6b111ad5.gif "gif")

As we run the above file, we first look for the main function where all the execution will start. In the above, it starts from console.log(bar(6)), which is pushed on to the stack, next frame on top of it is the function bar with it’s arguments which in turn calls function foo which is again pushed on to the top of stack and it returns immediately and so is popped out of stack, similarly bar is then popped out and finally console statement is popped out printing the output. All this happens in jiffy (in ms) one at a time.
