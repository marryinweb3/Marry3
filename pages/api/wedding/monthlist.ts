import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const year = req.query.year as string;
    const month = req.query.month as string;
    const offers: any = await prisma.wedding.findMany({
      where: {
        wedding_at: {
          gte: `${year}-${month}-01`,
          lte: `${year}-${month}-31`,
        },
      },
    });

    for (let i = 0; i < offers.length; i++) {
      let _offers = await prisma.wedding_join.findMany({
        where: { weddingId: offers[i].id },
      });
      offers[i].joiners = _offers;
    }
    res.send({
      offers,
    });
  } else {
    res.status(404).send({
      message: "error",
    });
    return;
  }
};

export default handler;
