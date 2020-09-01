# Call stack

the main job of the JS Engin is to read the javascript code and execute it and this done by :

- Memory Heap (order is not important)
  - place to store & write information
  - Allocate Memory
  - Release Memory
- Call Stack (order is important)
  - place to keep track of where we are in the code so that we can run the code in order

let's talk first about `Call Stack`

## Definitions

Call Stack is the place where the code execution has been tracked. Every data in the call stack will be pointed to the memory heap, it also called `execution stack`

Stack Stored in computer RAM just like the heap.

Stack consists of a set of `Stack Frames` that it contain

- the function that was invoked
- the parameters were passed to the function
- current line number

## How it work

- javascript has a **single call stack** which along with other parts like `heap`, `queue` constitutes the Javascript Concurrency Model (implemented inside of V8)

![1_ZSFHnq9iMHIApVLcgwczPQ](https://user-images.githubusercontent.com/55782435/91869399-81722f80-ec7e-11ea-8652-c10e1616f5b2.png "Visual Representation of JS Model")

- Stack: It’s a data structure which records the function calls, basically where in the program we are. If we call a function to execute , we push something on to the stack, and when we return from a function, we pop off the top of the stack. (Last in, First out) Javascript is a single threaded single concurrent language, meaning it can handle one task at a time or a piece of code at a time

## Examples on Call Stack

### in case if everything work right

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

![alt text](https://im4.ezgif.com/tmp/ezgif-4-22a86f2ffa01.gif "gif")

you can see it [here](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikgew0KICByZXR1cm4gYSAqIGI7DQp9DQpmdW5jdGlvbiBzcXVhcmUobikgew0KICByZXR1cm4gbXVsdGlwbHkobiwgbik7DQp9DQoNCmNvbnNvbGUubG9nKHNxdWFyZSgyKSk7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

In the above, it starts from `console.log(square(2))`, which is pushed on to the stack, next frame on top of it is the function `square` with it’s arguments which in turn calls function `multiply` which is again pushed on to the top of stack and it returns immediately and so is popped out of stack, similarly `square` is then popped out and finally `console statement` is popped out printing the output. All this happens in jiffy (in ms) one at a time.

### in case if infinite loop

Sometimes, we get into an infinite loop as we call a function multiple times recursively and as for Chrome browser, there is a limit on the size of the stack which is 16,000 frames , more than that it will just kill things for you and throw Maximum call stack size exceeded (image below)

![10](https://user-images.githubusercontent.com/55782435/91867469-5d155380-ec7c-11ea-95d7-4139a3e9c067.PNG "maximum call stack size exceeded error")

### in case if an error occurred

You all must have seen the long red error stack trace sometimes in our browser console, that basically indicates the current state of the call stack and where in the function it failed in a top to bottom manner just like stack (see image below)

![11](https://user-images.githubusercontent.com/55782435/91868343-51765c80-ec7d-11ea-94ec-9c6851f90f70.PNG "error")

we will talk about it later
![alt text](https://i.stack.imgur.com/i6k0Z.png "stack & heap")
