# primitive (Basic) data types in javascript

## Definition

A primitive value is a datum that is represented directly at the lowest level of the language implementation.

The latest ECMAScript standard defines nine types:

- Six Data Types that are `primitives`, checked by `typeof` operator:
  - Undefined `typeof instance === "undefined"`
  - Boolean `typeof instance === "boolean"`
  - Number `typeof instance === "number"`
  - String `typeof instance === "string"`
  - BigInt `typeof instance === "bigint"`
  - Symbol `typeof instance === "symbol"`
- Structural Types
  - Object :`typeof instance === "object"`. Special non-data but Structural type for any constructed object instance also used as data structures: new `Object`, new `Array`, new `Map`, new `Set`, new `WeakMap`, new `WeakSet`, new `Date` and almost everything made with `new keyword`;
  - Function : a non-data structure, though it also answers for typeof operator: typeof instance === "function". This is merely a special shorthand for Functions, though every Function constructor is derived from Object constructor.
- Structural Root Primitive:
  - null : typeof instance === "object". Special primitive type having additional usage for its value: if object is not inherited, then null is shown;

---

javascript is dynamically and weakly typed language because it doesn't enforce type on its variable declaration like other languages.

so javascript are determined at runtime when it's interpreted by the browser engine this make it dynamically typed language.

example:

- in other language (strongly typed language) mentoring type is mandatory

  ```c
  int a = 88;
  ```

- in javascript (dynamically typed language) type is determined at runtime

  ```js
  const a = "hello world";
  console.log(a); // hello world (string)
  ```

the type of the variable can be checked by using `typeof`.

javascript allows types to be deduced as other types a concept called _coercion_ this make javascript weakly typed language.

```js
// when the javascript encounter the following then it coerces the number into a string
const a = 2 + "32";
console.log(a); // "232"
```

Data types in javascript divide into two section

- primitive values (Basic) `stored on the stack`
  - String (a string is a sequence of characters used to represent text)
  - Number (Number is a numeric data type in the double-precision 64-bit floating point format)
  - Boolean (a Boolean is a logical data type that can have only the values true or false)
  - Undefined (is a primitive value automatically assigned to variables that have just been declared, or to formal arguments for which there are no actual arguments.)
  - Null (a null value represents a reference that points, generally intentionally, to a nonexistent or invalid object or address)
  - Symbol (in ES6, A value having the data type Symbol can be referred to as a "Symbol value")
  - BigInt (last ES, BigInt is a numeric data type that can represent integers in the arbitrary precision format)
- reference values `stored on the heap`
  - object
    - array

how do primitive types work?

### the difference between primitive and reference value

#### examples on primitive values (called by value)

so what will be the results for this code and why?

```js
let firstName = "mohammed";
console.log(firstName); // 1

let secondName = firstName;
console.log(secondName); // 2

firstName = "ali";
console.log(secondName); // 3
```

<details>
<summary>Show the results!</summary>
the results will be

1- `"mohammed"`

2- `"mohammed"`

3- `"mohammed"`

so why the third log didn't change to ali?

because the `firstName` type is a `string` and it's a primitive value and the primitive value copied by its value so when we assigned `firstName` to the `secondName` it's actually take the content (value) of the `firstName` (mohammed) and copy it (based it) as a value for the `secondName` so now we have _two names_ in our memory and when we reassigned `firstName` to `ali` so we changed one of these two values `firstName` and the `secondName` still is `mohammed`

</details>

#### examples on reference value (called by reference value)

so what will be the results for this code and why?

```js
let person = {
  age: 24,
  name: "ahmed",
  hobbies: ["sports", "programming"],
};
console.log(person); // 1

let secondPerson = person;
console.log(secondPerson); // 2

person.name = "ali";
console.log(secondPerson); // 3
```

<details>
<summary>Show the results!</summary>
the results will be

```js
// 1
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 2
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 3
{age: 24, name: "ali", hobbies: ["sports", "programming"]}

```

so why the third log change from the second? (this work different from the first example!)

here we change the name of person not the name of the secondPerson so why it change also in the secondPerson?

that's happened because objects in javascript are reference type

so here when we assigned person to secondPerson the actual object is not copied and the new variable pointed to the same place (object) so now we have to variable pointed to the same place (object) so when we changed the name of the person object the value also "changed" in secondPerson theoretically (actually it is one object in the memory), see the picture below

</details>

another two point:

another example what will be the results for this code and why?

```js
let person = {
  age: 24,
  name: "ahmed",
  hobbies: ["sports", "programming"],
};
console.log(person); // 1

let secondPerson = person;
console.log(secondPerson); // 2

person.name = "ali";
console.log(secondPerson); // 3

let thirdPerson = {
  age: 24,
  name: "ahmed",
  hobbies: ["sports", "programming"],
};
console.log(thirdPerson); // 4
```

<details>
<summary>Show the results!</summary>
the results will be

```js
// 1
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 2
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 3
{age: 24, name: "ali", hobbies: ["sports", "programming"]}

// 4
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}
```

so why thirdPerson does not change here?
alright it have the same keys and values but this is not matter, here we defined a new object regardless what it is contain that's mean we create a new object on the memory (heap) and there is no relation with the old object.

</details>

so what we can do to copy the object ?

```js
let person = {
  age: 24,
  name: "ahmed",
  hobbies: ["sports", "programming"],
};
console.log(person); // 1

// let secondPerson = person;
let secondPerson = Object.assign({}, person);
console.log(secondPerson); // 2

person.name = "ali";
console.log(secondPerson); // 3

let thirdPerson = {
  age: 24,
  name: "ahmed",
  hobbies: ["sports", "programming"],
};
console.log(thirdPerson); // 4
```

here we crate object and merge it with the exist object person so what will be the result of logs?

<details>
<summary>Show the results!</summary>
the results will be

```js
// 1
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 2
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 3
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 4
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}
```

so here we copied the object and this make it in a new place in the memory like the previous example

</details>

but there are problem here!!
if we change on array that exist on the object what will happened?

```js
let person = {
  age: 24,
  name: "ahmed",
  hobbies: ["sports", "programming"],
};
console.log(person); // 1

// let secondPerson = person;
let secondPerson = Object.assign({}, person);
console.log(secondPerson); // 2

person.name = "ali";
person.hobbies.push("reading");
console.log(secondPerson); // 3

let thirdPerson = {
  age: 24,
  name: "ahmed",
  hobbies: ["sports", "programming"],
};
console.log(thirdPerson); // 4
```

<details>
<summary>Show the results!</summary>
the results will be

```js
// 1
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 2
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}

// 3
{age: 24, name: "ahmed", hobbies: ["sports", "programming", "reading"]}

// 4
{age: 24, name: "ahmed", hobbies: ["sports", "programming"]}
```

so what happened here!!!
when we copied all the properties and the array also reference types and Object.assign does not crate a deep clone so the hobbies here riffed to the old one as we explained in the second example about reference values

so if you really need to clone the object you need to clone all the properties manually or use third party libraries to make deep clone.

</details>
