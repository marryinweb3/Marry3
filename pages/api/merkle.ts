import { NextApiHandler } from "next";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const whitelistAddress = [
  // "0xF95555A29E58188147D3A3AcD6e2Ffeb04EA7dd5",
  // "0xfe1fa387C545Ac7bfA46F6d720baA16902037F10",
  // "0x4374311B5d68E9eC496B70a55b8dD9469c804D1C",
  // "0xF4634A201A7E923Ee7c009B47389C9a0533EF537",
];

const leafNodes = whitelistAddress.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const rootHash = merkleTree.getHexRoot();
console.log("merkleTree", merkleTree.toString());
console.log("rootHash", merkleTree.getHexRoot());
const handler: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    const address = req.query.address as string;
    console.log(address);
    const proof = merkleTree.getHexProof(keccak256(address));
    console.log("proof", proof);
    // 这里可以验证proof是否正确
    const v = merkleTree.verify(proof, keccak256(address), rootHash);
    res.status(200).json({ proof: proof, in: v });
  } else {
    res.status(404).json({});
  }
};

export default handler;
