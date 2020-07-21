
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra')

// input dir
let dir = document.getElementById('inputik');

// dir content
let items = document.querySelector('.items')


let files;

function seg() {
   items.innerHTML = "";

   // string.raw to iclude the backslahes in the string
   let pathe = String.raw`${dir.value}`;

   let valid = pathExist(pathe)

   // catch error if dir not exists
   try {
      files = fs.readdirSync(pathe);
   } catch (err) {
      items.innerHTML = "Invalid Directory";
      return;
   }

   // call the create func
   createFolder(pathe);
}

async function pathExist (f) {
   const exists = await fse.pathExists(f)
 
  return exists;
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
            movefiles(src, `${dir}/Documents/${file}`)
         }
      })

      // pic
      picFiles.forEach(pic => {
         if(ext == pic ) {
            movefiles(src, `${dir}/Pictures/${file}`)
         }
      })

      // programs
      if(ext == '.exe') {
         movefiles(src, `${dir}/Programs/${file}`)
      }

      // compressed
      compressedFiles.forEach(com => {
         if(ext == com) {
            movefiles(src, `${dir}/Compressed/${file}`)
         }
      })

      // audio
      audioFiles.forEach(audio => {
         if(ext == audio) {
            movefiles(src, `${dir}/Audio/${file}`)
         }
      })

      // audio
      videoFiles.forEach(video => {
         if(ext == video) {
            movefiles(src, `${dir}/Video/${file}`)
         }
      })

       // to reload win on click
      location.reload();
   }
}

async function movefiles(src, dest) {
   try {
     await fse.move(src, dest)
     console.log('success!')
   } catch (err) {
     console.error(err)
   }
 }