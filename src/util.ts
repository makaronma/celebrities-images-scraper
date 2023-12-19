import axios from "axios";
import fs from "fs";

export const downloadImage = async (url: string, filename: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });

  fs.writeFile(filename, response.data, (err) => {
    if (err) throw err;
    console.log(`Downloaded: ${filename}`);
  });
};

export const createDirIfNotExist = (dirName: string) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
};
