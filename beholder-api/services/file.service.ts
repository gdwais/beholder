const fs = require("fs").promises;
import { Nft } from "../types";

export class FileService {
  async loadNfts(): Promise<Nft[]> {
    const csvString = await fs.readFile("./nfts.csv", "utf-8");
    const nfts: Nft[] = this.csvToArray<Nft>(csvString);
    return nfts;
  }

  csvToArray<T>(str: string, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const cleanHeaders = headers.map((h) =>
      h.endsWith("\r") ? h.slice(0, -1) : h
    );
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = cleanHeaders.reduce(function (object: any, header, index) {
        const value = values[index] || "";

        if (value.endsWith("\r")) {
          object[header] = value.slice(0, -1);
        } else {
          object[header] = value;
        }

        return object;
      }, {});
      return el;
    });
    return arr as T[];
  }
}
