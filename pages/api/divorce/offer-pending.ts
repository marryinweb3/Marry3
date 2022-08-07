import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../../lib/prisma";
import { checkPair, verifyMarried } from "../../../lib/verify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const Aaddress = req.query.Aaddress as string;
      const offer = await prisma.offers.findFirst({
        where: {
          Aaddress: Aaddress.toLowerCase(),
          status: {
            not: -1,
          },
          type: 1,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!offer) {
        return res.status(400).json({
          message: "no offer",
        });
      } else {
        try {
          const r = await checkPair(offer.Aaddress, offer.Baddress);
          console.log("checkPair", r);
          if (!r) {
            await prisma.offers.update({
              where: {
                id: offer.id,
              },
              data: {
                status: 2,
              },
            });
            await prisma.offers.updateMany({
              where: {
                OR: [
                  {
                    Aaddress: offer.Aaddress,
                    Baddress: offer.Baddress,
                  },
                  {
                    Aaddress: offer.Baddress,
                    Baddress: offer.Aaddress,
                  },
                ],
              },
              data: {
                status: -1,
              },
            });
            offer.status = 2;
          }
        } catch (e) {
          console.error(e);
          if (e.reason == "not valid pair") {
            await prisma.offers.update({
              where: {
                id: offer.id,
              },
              data: {
                status: 2,
              },
            });
            await prisma.offers.updateMany({
              where: {
                OR: [
                  {
                    Aaddress: offer.Aaddress,
                    Baddress: offer.Baddress,
                  },
                  {
                    Aaddress: offer.Baddress,
                    Baddress: offer.Aaddress,
                  },
                ],
              },
              data: {
                status: -1,
              },
            });
            offer.status = 2;
          }
        }

        delete offer.Asignature;
        delete offer.Bsignature;
        res.status(200).json(offer);
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "get offer error",
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
