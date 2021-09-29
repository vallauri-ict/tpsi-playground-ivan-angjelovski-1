let modulo = require("modulo");

modulo();

let sum = modulo.somma(3, 2);
let mul = modulo.moltiplicazione(3, 2);
console.log("sum: " + sum, "mul: " + mul);

console.log(modulo.json.nome);
modulo.json.setNome("pluto");
console.log(modulo.json.nome);

console.log("classe: " + modulo.MyClass.nome);
console.log("classe editata: " + modulo.MyClass.nome);