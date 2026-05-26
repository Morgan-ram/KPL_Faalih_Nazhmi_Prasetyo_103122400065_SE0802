/** 
 * tulislah sebuah fungsi yang menerima bilangan N dan mencetak penjumlahan dari satu hinga N contohnya, juka N adalah 5 maka fungsi akan mencetak 15 (1+2+3+4+5)
 * 
 */

function sumValues(N) {
  let sum = 0;
  for (let i = 1; i <= N; i++) {
    sum += i;
  }
  console.log(sum);
}

// Test
sumValues(1000); // Output: 15