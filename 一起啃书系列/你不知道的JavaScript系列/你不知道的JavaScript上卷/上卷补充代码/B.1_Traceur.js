// {
  try {
    throw undefined;
  } catch (a) {
    a = 2;
    console.log(a);
  }
//   console.log(a); // ReferenceError: a is not defined
// }
console.log(a);
