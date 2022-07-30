import { Buffer, Blob } from "buffer";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import pinataSDK from "@pinata/sdk";
import { NFTStorage } from "nft.storage";

// upload to pinata
const uploadToIPFS = async function (imageDataUrl: string) {
  const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const imageData = imageDataUrl.replace(/^data:image\/png;base64,/, "");
  const imageBuffer = Buffer.from(imageData, "base64");

  const someData = new Blob([imageBuffer]);
  //@ts-ignore
  const cid = await client.storeBlob(someData);
  console.log("cid", cid);
  return "ipfs://" + cid;
};
export default uploadToIPFS;
