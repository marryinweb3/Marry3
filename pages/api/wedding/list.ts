import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { NextApiHandler } from "next";
import { prisma } from "../../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const pageIndex = Number(req.query.pageIndex as string) || 1;
    const pageSize = 10;
    const offers: any = await prisma.wedding.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });

    for (let i = 0; i < offers.length; i++) {
      let _offers = await prisma.wedding_join.findMany({
        where: { weddingId: offers[i].id },
      });
      offers[i].joiners = _offers;
    }
    res.send({
      offers,
      total: await prisma.wedding.count({}),
    });
  } else {
    res.status(404).send({
      message: "error",
    });
    return;
  }
};

export default handler;
