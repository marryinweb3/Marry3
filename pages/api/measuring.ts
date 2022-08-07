import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // verify signature
      if (!req.body.nonce || !req.body.signature) {
        return res.status(400).json({
          message: "no valid signature",
        });
      }

      const hash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(["string"], [req.body.nonce])
      );

      const message = ethers.utils.arrayify(hash);
      const verfiyAddress = ethers.utils.verifyMessage(
        message,
        req.body.signature
      );
      if (verfiyAddress != req.body.address) {
        return res.status(400).json({
          message: "error signature",
        });
      }
      const data = {
        address: req.body.address.toLowerCase(),
      };

      const offer = await prisma.measurings.create({
        data: data,
      });
      if (offer) {
        res.status(200).json(offer);
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "already in the metaverse",
        success: false,
      });
      return;
    }
  } else {
    const measurings = await prisma.measurings.findMany();
    res.status(200).json(measurings);
  }
};

export default handler;
