
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra')


// input dir
let dir = document.getElementById('inputik');

// dir content
let items = document.querySelector('.items')

let count = 0;
let files;

// let pathee = pathe.replace(/\\/g, '/')

function seg() {
   items.innerHTML = "";
   console.log(dir.value);

   // string.raw to iclude the backslahes in the string
   let pathe = String.raw`${dir.value}`;

   files = fs.readdirSync(pathe)
   // call the create func
   createFolder(pathe);
}

function createFolder(dir) {
   const audio = `${dir}/Audio`;
   const pictures = `${dir}/Pictures`;
   const video = `${dir}/Video`;
   const documents = `${dir}/Documents`;
   const compressed = `${dir}/Compressed`;
   const programs = `${dir}/Programs`;

   
   // arr of variables
   const folderArray = [audio, pictures, video, documents, compressed, programs];

   // loop to create folder if isn't exist
   folderArray.forEach(item => {
      if(!fs.existsSync(item)) {
         fs.mkdirSync(item);
      }
   });

   moveFiles(dir, files);
}

function moveFiles(dir, files) {

   // putting the extention of a file in this var
   let ext;
   for(file of files) {
      ext = path.extname(file);
      console.log(ext)

      // dir of files
      let src = `${dir}/${file}`;

      // formats
      const docuFiles = ['.txt', '.doc', '.docx', '.html', '.htm', '.pdf', '.xls', '.xlsx', '.ppt', '.pptx', '.odt', '.ods'];
      const compressedFiles = ['.zip', '.7z', '.bz2', '.gz', '.rar', '.tar'];
      const audioFiles = ['.mp3', '.flac', '.aac', '.wav', '.wma'];
      const videoFiles = ['.avi', '.mts', '.wmv', '.mkv', '.webm', '.flv', '.mp4', '.m4v']
      const picFiles = ['.jpeg', '.png', '.rif', 'tiff', '.svg', '.jpg']


      // docus
      docuFiles.forEach(docu => {
         if(ext == docu ) {
            example(src, `${dir}/Documents/${file}`)
         }
      })

      // pic
      picFiles.forEach(pic => {
         if(ext == pic ) {
            example(src, `${dir}/Pictures/${file}`)
         }
      })

      // programs
      if(ext == '.exe') {
         example(src, `${dir}/Programs/${file}`)
      }

      // compressed
      compressedFiles.forEach(com => {
         if(ext == com) {
            example(src, `${dir}/Compressed/${file}`)
         }
      })

      // audio
      audioFiles.forEach(audio => {
         if(ext == audio) {
            example(src, `${dir}/Audio/${file}`)
         }
      })

      // audio
      videoFiles.forEach(video => {
         if(ext == video) {
            example(src, `${dir}/Video/${file}`)
         }
      })

       // to reload win on click
      location.reload();
   }
}

async function example (src, dest) {
   try {
     await fse.move(src, dest)
     console.log('success!')
   } catch (err) {
     console.error(err)
   }
 }