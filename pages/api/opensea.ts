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
const sdk = require("api")("@opensea/v1.0#mxj1ql5k6c0il");

const streamPipeline = promisify(pipeline);
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const address = req.query.address as string;
    console.log("address", address);
    const rs = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&limit=100&include_orders=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.OPENSEA,
        },
      }
    );
    const json = await rs.json();
    res.status(200).send({
      json,
    });
    return json;
  } else {
    res.status(404).send({
      message: "error",
    });
    return;
  }
};

export default handler;
