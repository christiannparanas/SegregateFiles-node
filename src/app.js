

const fs = require('fs');

const dir = document.querySelector('#input').value;



const pathe = "C:\\Users\\christian\\Downloads";
let pathee = pathe.replace(/\\/g, '/')

function seg() {

   const files = fs.readdirSync(pathee)

   for (file of files) {
      console.log(file)
   }
}
