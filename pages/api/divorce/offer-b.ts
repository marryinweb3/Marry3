import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../../lib/prisma";
import { checkPair, verifyMarried } from "../../../lib/verify";

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
        id: req.body.id,
        Baddress: req.body.address.toLowerCase(),
        Bsignature: req.body.signature,
        status: 1,
      };

      // check
      const result = await prisma.offers.findFirst({
        where: {
          id: data.id,
          status: 0,
          type: 1,
        },
      });
      if (!result) {
        return res.status(400).json({
          message: "no offer to accept",
        });
      }
      if (result.Aaddress == data.Baddress) {
        return res.status(400).json({
          message: "Aaddress and Baddress is same",
        });
      }
      try {
        const isPair = await checkPair(result.Aaddress, data.Baddress);

        if (!isPair) {
          return res.status(400).json({
            message: "you have not paired",
          });
        }
      } catch (e) {
        return res.status(400).json({
          message: "you have not paired",
        });
      }

      // update offer
      const offer = await prisma.offers.update({
        data: data,
        where: {
          id: data.id,
        },
      });
      if (offer) {
        delete offer.Asignature;
        delete offer.Bsignature;
        res.status(200).json(offer);
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "update offer error",
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
