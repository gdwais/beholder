const axios = require("axios");
const fs = require("fs");

const datas: any[] = [];

export class ImageService {
  constructor() {}

  downloadImage(url: string, imageName: string) {
    return axios({
      url,
      responseType: "stream",
    }).then(
      (response: any) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(`../images/${imageName}`))
            .on("finish", () => resolve(true))
            .on("error", (e: any) => reject(e));
        })
    );
  }

  async downloadDataImages() {
    for (const data of datas) {
      try {
        const result = await this.downloadImage(data.image, `${data.mint}.png`);

        if (result && result.error) {
          console.error(data.mint, result.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}
