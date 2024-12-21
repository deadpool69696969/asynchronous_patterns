// Import promisify function to convert callbacks into promises

import fs from "fs";
import { resolve, dirname } from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";

var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);

// console.log(__filename);
// console.log(__dirname);

var comment = 1;
// sync function to replace string characters with X
// function hideString(str) {
//   return str.replace(/[a-zA-Z]/g, "X");
// }
// var hidden = hideString("Hello World");
// console.log(hidden);
// console.log("end");

comment = 2;
// CPS - Continuation Passing Style
// to do so we are not using return keyword in above function instead take another function as argument.
// so we are passing hidden string back via function.
// we remove the variable and capture the hidden variable via the arguments of the function that we pass as a second argument
// we can say its a callback but technically thats not true b/se a callback need to be asynchronous. but the belowe code is synchronous
// function hideString(str, done) {
//   done(str.replace(/[a-zA-Z]/g, "X"));
// }

// hideString("Hello World", (hidden) => {
//   console.log(hidden);
// });

// console.log("end");

comment = 3;
// let's do a callback using process.nextTick() this will run on next node JS loop and it won't happen synchronously
// function hideString(str, done) {
//   process.nextTick(() => {
//     done(str.replace(/[a-zA-Z]/g, "X")); // its a callback now
//   });
// }

// hideString("Hello World", (hidden) => {
//   console.log(hidden);
// });

// console.log("end");

comment = 4;
// delay function using settimeout - another way of doing callback
// function delay(seconds, callback) {
//   setTimeout(callback, seconds * 1000); // ms to s
// }
// // sequential execution - callback hell or pyramid of doom
// console.log("Starting Delays");
// delay(2, () => {
//   console.log("2 seconds");
//   delay(1, () => {
//     console.log("3 seconds");
//     delay(3, () => {
//       console.log("6 seconds");
//     });
//   });
// });

comment = 5;

// //Promises - another way of doing asyncronicity in our code
// //Wait for async operation ot complete then we can resolve the promise
// //reslove for success reject for failure
// var delay = (seconds) =>
//   new Promise((resolves, rejects) => {
//     //throw new Error("aah");
//     if (seconds > 3) {
//       rejects(new Error(`wait is too long ${seconds}`));
//     }
//     setTimeout(() => {
//       resolves("the long delay has ended");

// // this will return the message

//     }, seconds * 1000);
//   });
//  . then takes a function
// //these 2 code lines are same

// delay(1).then((message) => console.log(message));

// //chain example

// delay(1)
// .then(console.log)
// .then(() => console.log("hello world"));

// //chain example with return value

// delay(1)
//   .then(console.log)
//   .then(() => 42)
//   .then((num) => console.log(`hello world ${num}`))
//   .catch((error) => console.log(`error: ${error.message}`));

// delay(4)
//   .then(console.log)
//   .then(() => 42)
//   .then((num) => console.log(`hello world ${num}`))
//   .catch((error) => console.log(`error: ${error.message}`));
// console.log("Starting Delays");

comment = 6;

// // both promises and callbacks can be used to handle asyncronicity winthin JS. Promises is a bit nicer so nodejs comes up a function to convert callback functions into promises

// var delay = (seconds, callbacks) => {
//   if (seconds > 3) {
//     callbacks(new Error(`${seconds} seconds it too long!`));
//   } else {
//     callbacks(null, `the ${seconds} second delay is over`);
//   }
// };

// // delay(2, (error, message) => {
// //   if (error) {
// //     console.log(`error: ${error.message}`);
// //   } else {
// //     console.log(message);
// //   }
// // });

// // delay(4, (error, message) => {
// //   if (error) {
// //     console.log(`error: ${error.message}`);
// //   } else {
// //     console.log(message);
// //   }
// // });

// //convert delay function to promise using promisify

// var promiseDelay = promisify(delay);

// promiseDelay(2)
//   .then(console.log)
//   .catch((err) => {
//     console.log(`Error: ${err.message}`);
//   });

// promiseDelay(4)
//   .then(console.log)
//   .catch((err) => {
//     console.log(`Error: ${err.message}`);
//   });
// console.log("end line");

comment = 7;

// In file system module all of the function uses callback

// var writeFile = promisify(fs.writeFile);

// writeFile("sample.text", "this is a sample file 2")
//   .then(() => console.log("file successfully created"))
//   .catch((error) => console.log("error creating file"));

comment = 8;

// Callback hell -- anti pattern

// var beep = () => process.stdout.write("\x07");

// const doStuffSequentially = () => {
//   console.log("starting");
//   setTimeout(() => {
//     console.log("waiting");
//     setTimeout(() => {
//       console.log("waiting some more");
//       fs.writeFile("file.txt", "SAMPLE FILE....", (error) => {
//         if (error) {
//           console.error(error);
//         } else {
//           beep();
//           console.log("file.txt created");
//           setTimeout(() => {
//             beep();
//             fs.unlink("file.txt", (error) => {
//               if (error) {
//                 console.error(error);
//               } else {
//                 console.log("file.txt removed");
//                 console.log("sequential execution completed");
//               }
//             });
//           }, 3000);
//         }
//       });
//     }, 2000);
//   }, 1000);
// };

// doStuffSequentially();

comment = 9;

// will fix it using promise - we are doing same sequential code but with promises so it is more readable and neat - using pomise chain
// var writeFile = promisify(fs.writeFile);
// var unlink = promisify(fs.unlink);
// var beep = () => process.stdout.write("\x07");

// var delay = (seconds) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, seconds * 1000);
//   });

// const doStuffSequentially = () =>
//   Promise.resolve()
//     .then(() => console.log("starting"))
//     .then(() => delay(1)) // return a promise so it will wait for the promise to complete
//     .then(() => "waiting")
//     //.then(() => console.log("waiting"))
//     .then(console.log) // use waiting msg from prev then
//     .then(() => delay(2))
//     .then(() => console.log("waiting some more"))
//     .then(() => writeFile("file.txt", "SAMPLE FILE...."))
//     .then(beep)
//     .then(() => "file.txt created")
//     .then(console.log)
//     .then(() => delay(3))
//     .then(beep)
//     .then(() => unlink("file.txt"))
//     .then(() => "file.txt removed")
//     .then(console.log)
//     .then(() => "sequential execution completed")
//     .then(console.log)
//     .catch(console.error);

// doStuffSequentially();

comment = 10;

// doing same sync code without promises then chain using async/await
// js provide us a solution to use promises in normal code using async functions - inside async function we can await for a promise to complete

var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var beep = () => process.stdout.write("\x07");

var delay = (seconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

// const doStuffSequentially = async () => {
//   try {
//     console.log("starting");
//     await delay(1);
//     console.log("waiting");
//     await delay(2);
//     console.log("waiting some more");
//     await writeFile("file.txt", "SAMPLE FILE....");
//     console.log("file.txt created");
//     await delay(3);
//     beep();
//     await unlink("file.txt");
//     console.log("file.txt removed");
//     console.log("sequential execution completed");
//   } catch (e) {
//     console.log("Error: ", e.message);
//   }
// };
//
// doStuffSequentially();

comment = 11;

//getting promise result in variable inside async await function

var readdir = promisify(fs.readdir);

// async function start() {
//   var files = await readdir(__dirname);
//   console.log(files);
// }

// start();

comment = 12;

// Promises all -> wait for all processes to complete before triggering then chain
// Parallel Execution in Promises - RUn in parallel -  Promises.all

// Promise.all([
//   writeFile("readme.md", "Hellow World"),
//   writeFile("readme.txt", "Hellow World"),
//   writeFile("readme.json", '{"hello":"world"}'),
// ])
//   .then(() => readdir(__dirname))
//   .then(console.log)
//   .then(() => delay(3))
//   .then(() => unlink("readme.md"))
//   .then(() => unlink("readme.txt"))
//   .then(() => unlink("readme.json"));

comment = 13;
// Parallel Execution in Promises - Promise.race run only the first one
Promise.race([delay(5), delay(2), delay(3), delay(7), delay(3), delay(6), delay(10), delay(15)])
  .then(() => console.log("Promise completed"));

comment = 14;
