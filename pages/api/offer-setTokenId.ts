import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import uploadToIPFS from "../../lib/upload";
import { verifyMarried } from "../../lib/verify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // verify signature

      const id = req.query.id as string;
      const tokenIdA = req.query.tokenIdA as string;
      const tokenIdB = req.query.tokenIdB as string;

      const result = await prisma.offers.update({
        where: {
          id: id,
        },
        data: {
          AtokenId: tokenIdA,
          BtokenId: tokenIdB,
        },
      });
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "update tokenId error",
      });
      return;
    }
  } else {
    res.status(404).send({
      message: "error",
    });
    return;
  }
};

export default handler;
