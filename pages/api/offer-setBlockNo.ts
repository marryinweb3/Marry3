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

      await prisma.offers.updateMany({
        where: {
          id: req.body.id as string,
          Bsignature: req.body.Bsignature as string,
        },
        data: {
          blockNo: req.body.blockNo,
        },
      });
    } catch (e) {
      res.status(404).send({
        message: "error",
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
