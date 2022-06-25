import { Prisma } from "@prisma/client";
import { ethers } from "ethers";
import moment from "moment";
import { NextApiHandler } from "next";
import { prisma } from "../../../lib/prisma";
import SocialPost from "social-post-api"; // Install "npm i social-post-api"
import webhook from "webhook-discord";

import { getTokenPairInfo, verifyMarried } from "../../../lib/verify";
const sexMap = {
  0: "Male",
  1: "Female",
  2: "X",
};
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    let tokenId = req.query.tokenId as string;
    if (!tokenId) {
      return res.status(400).json({
        message: "no tokenId",
      });
    }
    tokenId = tokenId.replace(".json", "");
    console.log("tokenId", tokenId);

    try {
      const pairInfo = await getTokenPairInfo(tokenId);
      if (pairInfo) {
        const offer = await prisma.offers.findFirst({
          where: {
            OR: [
              {
                Aaddress: pairInfo[0].partner.toLowerCase(),
                Baddress: pairInfo[1].partner.toLowerCase(),
              },
              {
                Aaddress: pairInfo[1].partner.toLowerCase(),
                Baddress: pairInfo[0].partner.toLowerCase(),
              },
            ],
            status: {
              not: -1,
            },
            type: 0,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        console.log("offer", offer);
        const isA = offer.Aaddress == pairInfo[1].partner.toLowerCase();
        if (offer) {
          const AtokenId = pairInfo[0].tokenId;
          const BtokenId = pairInfo[1].tokenId;

          if (offer.status === 1) {
            offer.AtokenId = isA ? AtokenId.toString() : BtokenId.toString();
            offer.BtokenId = isA ? BtokenId.toString() : AtokenId.toString();
            await prisma.offers.update({
              data: {
                status: 2,
                AtokenId: offer.AtokenId,
                BtokenId: offer.BtokenId,
                mintedAt: new Date(),
              },
              where: {
                id: offer.id,
              },
            });
            const Hook = new webhook.Webhook(process.env.DISCORD_HOOK);
            Hook.success(
              "New Married in web3!",
              `${offer.Aname} and ${offer.Bname} are now married in web3! Congratulations! https://marry3.love/i/${offer.AtokenId} #marry3 `
            );

            const social = new SocialPost(process.env.TWITTER_API);

            await social
              .post({
                post: `${offer.Aname} and ${offer.Bname} are now married in web3! Congratulations! https://marry3.love/i/${offer.AtokenId} #marry3 `,
                platforms: ["twitter"],
                mediaUrls: [
                  "https://ipfs.infura.io/ipfs/" +
                    offer.imageData.replace("ipfs://", ""),
                  // "https://ipfs.infura.io/ipfs/" +
                  //   offer.imageDataB.replace("ipfs://", ""),
                ],
              })
              .catch(console.error);
          }

          const result = {
            name: `Marry3 #${tokenId} ${isA ? offer.Aname : offer.Bname}&${
              isA ? offer.Bname : offer.Aname
            }`,
            description: `${offer.Aname} and ${
              offer.Bname
            } got married in Web3, base on ERC721-520 Contract, on ${moment(
              pairInfo[0].time.toNumber() * 1000
            ).format("YYYY-MM-DD")}, link: https://marry3.love/i/${tokenId}`,
            external_url: `https://marry3.love/i/${tokenId}`,
            image:
              (isA ? offer.imageData : offer.imageDataB) ||
              "https://bafybeialnklgnjla6p773rcuvtk25cwrjul25ccl7a2vnd4yqbuqsgse4y.ipfs.infura-ipfs.io/?filename=1.png",
            attributes: [
              {
                trait_type: "date",
                value: `${moment(pairInfo[0].time.toNumber() * 1000).format(
                  "YYYY-MM-DD"
                )}`,
              },
              {
                trait_type: "passed",
                value: `${Math.floor(
                  (moment().toDate().getTime() -
                    moment(pairInfo[0].time.toNumber() * 1000)
                      .toDate()
                      .getTime()) /
                    1000 /
                    60 /
                    60 /
                    24
                )} days`,
              },
              { trait_type: "sex", value: sexMap[pairInfo[0].sex] },
              { trait_type: "ensA", value: offer.Aname },
              { trait_type: "ensB", value: offer.Bname },
            ],
          };
          res.status(200).send(result);
          return;
        }
      }
      res.status(404).send({
        message: "not exist tokenId",
      });
      return;
    } catch (e) {
      console.log(e);
      res.status(404).send({
        message: "not exist tokenId",
      });
      return;
    }
  } else {
    res.status(404).send({
      message: "not exist tokenId",
    });
    return;
  }
};

export default handler;
