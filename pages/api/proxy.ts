import { Buffer } from "buffer";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import pinataSDK from "@pinata/sdk";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import { createWriteStream } from "fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import fetch from "node-fetch";

const streamPipeline = promisify(pipeline);
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    console.log(decodeURIComponent(req.query.url as string));
    const response = await fetch(decodeURIComponent(req.query.url as string));

    if (!response.ok)
      throw new Error(`unexpected response ${response.statusText}`);

    await streamPipeline(response.body, res);
    return;
  } else {
    res.status(404).send({
      message: "error",
    });
    return;
  }
};

export default handler;
