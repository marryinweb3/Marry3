import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import { verifyMarried } from "../../lib/verify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // verify signature

      let verfiyAddress;
      if (req.query.nonce && req.query.signature) {
        const hash = ethers.utils.keccak256(
          ethers.utils.defaultAbiCoder.encode(["string"], [req.query.nonce])
        );

        const message = ethers.utils.arrayify(hash);

        verfiyAddress = ethers.utils.verifyMessage(
          message,
          req.query.signature as string
        );
      }

      const id = req.query.id as string;
      const offer = await prisma.offers.findFirst({
        where: {
          id,
        },
      });
      if (!offer) {
        return res.status(400).json({
          message: "no offer",
        });
      } else {
        console.log(verfiyAddress, offer);
        // check mint status

        if (verfiyAddress) {
          if (offer.Aaddress === verfiyAddress.toLowerCase()) {
            return res.status(200).json(offer);
          }
        }
        delete offer.Asignature;
        delete offer.Bsignature;
        res.status(200).json(offer);
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "create offer error",
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
