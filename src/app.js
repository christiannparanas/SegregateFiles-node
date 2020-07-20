
const fs = require('fs');
const moveFile = require('move-file');


// input dir
let dir = document.getElementById('inputik');

// dir content
let items = document.querySelector('.items')


// let pathee = pathe.replace(/\\/g, '/')

function seg() {
   console.log(dir.value);

   // string.raw to iclude the backslahes in the string
   let pathe = String.raw`${dir.value}`;

   const files = fs.readdirSync(pathe)

   for (file of files) {
      console.log(file)
      items.innerHTML += `<li>${file}</li>`
   }
}
