import { Buffer } from "buffer";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import pinataSDK from "@pinata/sdk";
// upload to pinata
const uploadToIPFS = async function (imageDataUrl: string) {
  const pinata = pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY
  );
  const imageData = imageDataUrl.replace(/^data:image\/png;base64,/, "");
  const imageBuffer = Buffer.from(imageData, "base64");
  const stream = Readable.from(imageBuffer);
  //@ts-ignore
  stream.path = `${uuidv4()}.png`;

  const result = await pinata.pinFileToIPFS(stream, {});

  return "ipfs://" + result.IpfsHash;
};
export default uploadToIPFS;
