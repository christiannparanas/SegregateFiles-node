

const fs = require('fs');

let dir = document.getElementById('inputik');



// string.raw to iclude the backslahes in the string
// let pathe = String.raw`${}`;

// let pathee = pathe.replace(/\\/g, '/')

function seg() {
   console.log(dir.value);

   // string.raw to iclude the backslahes in the string
   let pathe = String.raw`${dir.value}`;

   const files = fs.readdirSync(pathe)

   for (file of files) {
      console.log(file)
   }
}
