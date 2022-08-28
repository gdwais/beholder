const fs = require('fs');
const axios = require('axios');

const datas = require("./data.json");

const downloadImage = (url, imageName) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(`../images/${imageName}`))
          .on('finish', () => resolve())
          .on('error', e => reject(e));
      }),
  );

(async () => {

  for(const data of datas) {
    try {
      const result = await downloadImage(data.image, `${data.mint}.png`);
      
      if (result && result.error) {
        console.error(data.mint, result.error);
      }
    } catch (err) {
      
      console.error(err);
    }

  }
})();