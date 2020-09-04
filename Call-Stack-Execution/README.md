# Javascript Engine (Call Stack & Heap)

The Javascript Engine does a lot of work for us. But the biggest thing is reading our code and executing it. The two main important things in this step are:

1- We need a place to store and write information — data for our app(variables, objects, etc..) for that we use `Memory Heap`.

2- We need to keep track of what's happening to our code line by line for that we use `Call Stack`.

## Call Stack

### Definitions

Call Stack is the place where the code execution has been tracked. Every data in the call stack will be pointed to the memory heap, it also called `execution stack`

We can think of a call stack as a region in memory that operates in a first in last out mode

Stack consists of a set of `Stack Frames` that it contain

- the function that was invoked
- the parameters were passed to the function
- current line number

### How it work

- javascript has a **single call stack** which along with other parts like `heap`, `queue` constitutes the Javascript Concurrency Model (implemented inside of V8)

![1_ZSFHnq9iMHIApVLcgwczPQ](https://user-images.githubusercontent.com/55782435/91869399-81722f80-ec7e-11ea-8652-c10e1616f5b2.png "Visual Representation of JS Model")

- Stack: It’s a data structure which records the function calls, basically where in the program we are. If we call a function to execute , we push something on to the stack, and when we return from a function, we pop off the top of the stack. (Last in, First out) Javascript is a single threaded single concurrent language, meaning it can handle one task at a time or a piece of code at a time

### Examples

#### 1- in case if everything work right

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

![alt text](https://media.giphy.com/media/SANtxs7a76o3QXfLCo/giphy.gif "gif")

you can see it [here](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikgew0KICByZXR1cm4gYSAqIGI7DQp9DQpmdW5jdGlvbiBzcXVhcmUobikgew0KICByZXR1cm4gbXVsdGlwbHkobiwgbik7DQp9DQoNCmNvbnNvbGUubG9nKHNxdWFyZSgyKSk7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

Just know that whatever is on top of the stack is what’s running.

In the above, it starts from `console.log(square(2))`, which is pushed on to the stack, next frame on top of it is the function `square` with it’s arguments which in turn calls function `multiply` which is again pushed on to the top of stack and it returns immediately and so is popped out of stack, similarly `square` is then popped out and finally `console statement` is popped out printing the output. All this happens in jiffy (in ms) one at a time.

This is the way it works in most languages — we have call stacks and memory heaps. Now, since the Javascript engine implementations vary, where variables are allocated is not 100% the same all the time.

Simple variables can be stored on the stack and complex data structures arrays, objects are stored in memory heap.

#### 2- in case if infinite loop (Stack Overflow)

Sometimes, we get into an infinite loop as we call a function multiple times recursively and as for Chrome browser, there is a limit on the size of the stack which is 16,000 frames , more than that it will just kill things for you and throw Maximum call stack size exceeded (image below)

![10](https://user-images.githubusercontent.com/55782435/91867469-5d155380-ec7c-11ea-95d7-4139a3e9c067.PNG "maximum call stack size exceeded error")

#### 3- in case if an error occurred

You all must have seen the long red error stack trace sometimes in our browser console, that basically indicates the current state of the call stack and where in the function it failed in a top to bottom manner just like stack (see image below)

![11](https://user-images.githubusercontent.com/55782435/91868343-51765c80-ec7d-11ea-94ec-9c6851f90f70.PNG "error")

## Heap

### Heap Definitions

It is an unstructured memory that is used for memory allocation of the variables and the objects, so its work it:
- place to store & write information
- Allocate Memory
- Release Memory

![alt text](https://i.stack.imgur.com/i6k0Z.png "stack & heap")
as you see in the picture the `order is not important in heap` but the `order is important in call stack`

### Example

```javascript
function A() {
  // memory address 100000
  console.log("in A"); // 100001
  B(); // 100002
  console.log("returned to A"); // 100003
}
function B() {
  // 200000
  console.log("in B"); // 200001
  C(); // 200002
  console.log("returned to B"); // 200003
}
function C() {
  // 300000
  console.log("in C"); // 300001
}
```

the results of the above code will be

```
2: in A
7: in B
12: in C
9: returned to B
4: returned to A
```

for the first 3 statement there is no problem but we will notice that the forth and fifth statement we go back to line 9 after we were in line 12 who this happened?

the stack used the memory address to keep the track for the code execution so what happened theoretically something like this:

```js
//goto 100000 and execute code
stack.push(100001); // [ 100001] and execute it
//goto 200000 and execute code
stack.push(200001); // [100001,200001] and execute it
//goto 300000 and execute code
topOfStack = stack.pop(); //topOfStack=200001
// goto   topOfStack+1 and execute
topOfStack = stack.pop(); //topOfStack=100001
// goto   topOfStack+1 and execute
```

Who we create in heap still until we close the program but in the stack still until we make `pop` for it.

## Stack and heap differ in the following ways

1- **Memory Allocation**: Stack is used for static memory allocation and Heap for dynamic memory allocation, both stored in the computer's RAM .

2- **Variables**: Variables allocated on the stack are stored directly to the memory and access to this memory is very fast, and it's allocation is dealt with when the program is compiled. When a function or a method calls another function which in turns calls another function etc., the execution of all those functions remains suspended until the very last function returns its value. Variables allocated on the heap have their memory allocated at run time and accessing this memory is a bit slower, but the heap size is only limited by the size of virtual memory.

3- **Access**: The stack is always reserved in a LIFO order, the most recently reserved block is always the next block to be freed. This makes it really simple to keep track of the stack, freeing a block from the stack is nothing more than adjusting one pointer. Element of the heap have no dependencies with each other and can always be accessed randomly at any time. You can allocate a block at any time and free it at any time. This makes it much more complex to keep track of which parts of the heap are allocated or free at any given time.

## exercises

### 1- what is the results?

```js
function foo1() {
  console.log(1);
}
function foo2() {
  console.log(2);
}
function foo3() {
  console.log(3);
}

foo1(foo2(foo3()));
```

<details>
<summary>Show the results!</summary>

```js
// 3
// 2
// 1
```

</details>

### 2- what is the results?

```js
function foo1() {
  var x = foo2();
  return x * 3;
}

function foo2() {
  var y = foo3();
  return Number(y);
}

function foo3() {
  return "1";
}

foo1();
```

<details>
<summary>Show the results!</summary>

```js
// 3
```

</details>

### 3- what is the results?

```js
function firstFunction() {
  console.log("I'm the first function");
}

function secondFunction(callback) {
  callback();
  console.log("I'm the second function and I expect a callback as an input");
}
secondFunction(firstFunction);
```

<details>
<summary>Show the results!</summary>

```js
// I'm the first function
// I'm the second function and I expect a callback as an input
```

</details>

### 4- what is the results?

```js
function firstFunction() {
  console.log("I'm the first function");
}

function secondFunction(callback) {
  callback();
  console.log("I'm the second function and I expect a callback as an input");
}

function thirdFunction(callback) {
  callback();
  console.log(
    "I'm the third function, I'm also expecting a callback as an input"
  );
}

thirdFunction(secondFunction(firstFunction));
```

<details>
<summary>Show the results!</summary>

```js
// I'm the first function
// I'm the second function and I expect a callback as an input
// TypeError: callback is not a function
```

so why this error occur?
because function `secondFunction` return undefined and it will be like this `thirdFunction(undefined)` so when it will run the callback it will be like `undefined()` this is not a function to execute so to solve it we need to call it like this

```js
thirdFunction(function () {
  secondFunction(firstFunction);
});
```

[see it here](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gZmlyc3RGdW5jdGlvbigpIHsNCiAgY29uc29sZS5sb2coIkknbSB0aGUgZmlyc3QgZnVuY3Rpb24iKTsNCn0NCg0KZnVuY3Rpb24gc2Vjb25kRnVuY3Rpb24oY2FsbGJhY2spIHsNCiAgY2FsbGJhY2soKTsNCiAgY29uc29sZS5sb2coIkknbSB0aGUgc2Vjb25kIGZ1bmN0aW9uIGFuZCBJIGV4cGVjdCBhIGNhbGxiYWNrIGFzIGFuIGlucHV0Iik7DQp9DQoNCmZ1bmN0aW9uIHRoaXJkRnVuY3Rpb24oY2FsbGJhY2spIHsNCiBjYWxsYmFjaygpOw0KIGNvbnNvbGUubG9nKCJJJ20gdGhlIHRoaXJkIGZ1bmN0aW9uLCBJJ20gYWxzbyBleHBlY3RpbmcgYSBjYWxsYmFjayBhcyBhbiBpbnB1dCIpOw0KfQ0KDQp0aGlyZEZ1bmN0aW9uKGZ1bmN0aW9uKCkge3NlY29uZEZ1bmN0aW9uKGZpcnN0RnVuY3Rpb24pfSk%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

</details>

## Resources & further reading

- [video- The JS Call Stack Explained In 9 Minutes](https://www.youtube.com/watch?v=W8AeMrVtFLY)
- [MDN- Call Stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)
- [medium- Javascript Fundamentals — Call Stack and Memory Heap](https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204)
- [medium- Understanding Javascript Function Executions — Call Stack, Event Loop , Tasks & more](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)
