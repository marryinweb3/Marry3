import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../../lib/prisma";
import { verifyMarried } from "../../../lib/verify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // @todo 首先去合约中检查是否已经结婚
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
      if (verfiyAddress != req.body.addressA) {
        return res.status(400).json({
          message: "error signature",
        });
      }

      const offerForA = await prisma.offers.findFirst({
        where: {
          OR: [
            {
              Aaddress: req.body.addressA,
            },
            {
              Baddress: req.body.addressA,
            },
          ],
        },
      });
      if (!offerForA) {
        return res.status(400).json({
          message: "not married yet",
        });
      }

      const married = await verifyMarried(req.body.addressA);

      if (!married) {
        return res.status(400).json({
          message: "not married yet",
        });
      }
      const data = {
        addressA: req.body.addressA.toLowerCase(),
        addressB: req.body.addressB.toLowerCase(),
        nameA: req.body.nameA,
        nameB: req.body.nameB,
        coverA: req.body.coverA,
        coverB: req.body.coverB,
        wedding_at: new Date(req.body.wedding_at),
        type: req.body.type,
        comment: req.body.comment,
      };

      // one offer one day
      const result = await prisma.wedding.findFirst({
        where: {
          OR: [
            {
              addressA: data.addressA,
            },
            {
              addressB: data.addressA,
            },
          ],
        },
      });
      if (result) {
        return res.status(400).json({
          message: "already added a wedding",
        });
      }
      // create offer
      const offer = await prisma.wedding.create({
        data: data,
      });
      if (offer) {
        res.status(200).json(offer);
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "create wedding error",
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
