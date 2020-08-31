# Call stack

`Call stack` is a dynamic data structure it also called `execution stack` or simply `stack`

## Javascript is a single threaded single concurrent language

meaning it can handle one task at a time or a piece of code at a time. It has a **single call stack** which along with other parts like `heap`, `queue` constitutes the Javascript Concurrency Model (implemented inside of V8)

## Let us first go through each of these terminologies

1-Call Stack

```js
function foo(b) {
  var a = 5;
  return a * b + 10;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(6));
```

the output will be 100

![alt text](https://miro.medium.com/max/600/1*E3zTWtEOiDWw7d0n7Vp-mA.gif "Logo Title Text 1")

As we run the above file, we first look for the main function where all the execution will start. In the above, it starts from console.log(bar(6)), which is pushed on to the stack, next frame on top of it is the function bar with it’s arguments which in turn calls function foo which is again pushed on to the top of stack and it returns immediately and so is popped out of stack, similarly bar is then popped out and finally console statement is popped out printing the output. All this happens in jiffy (in ms) one at a time.
