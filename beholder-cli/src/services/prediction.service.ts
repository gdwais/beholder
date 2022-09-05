import * as tf from "@tensorflow/tfjs";
require('@tensorflow/tfjs-node');
import axios from "axios";
import sharp from "sharp";
import { decodeImage } from "@tensorflow/tfjs-node/dist/image";

export class PredictionService {
  async loadModel() {
    return await tf.loadGraphModel(`file://model/model.json`);
  }

  async predict(url: string): Promise<Float32Array | undefined> {
    const buffer = await this.loadImage(url);

    if (buffer) {
      const model = await this.loadModel();

      const tensor = decodeImage(buffer, 4);
      const castedTensor = tensor.cast("float32");
      const resultTensor: any = model.predict(castedTensor);
      const result: Float32Array = await resultTensor.data();

      return result;
    }

    return;
  }

  async loadImage(url: string): Promise<Buffer | undefined> {
    try {
      const imageResponse = await axios.get(url, {
        responseType: "arraybuffer",
      });

      const buffer: Buffer = imageResponse.data as Buffer;

      const resized = await sharp(buffer, { animated: true })
        .resize({ width: 224, height: 224 })
        .gif({ dither: 0 })
        .toBuffer();

      return resized;
    } catch (error: any) {
      console.error("error when loading image", error);
    }
  }
}
