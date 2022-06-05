import { NextApiHandler } from "next";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const whitelistAddress = ["0xF95555A29E58188147D3A3AcD6e2Ffeb04EA7dd5"];

const leafNodes = whitelistAddress.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const rootHash = merkleTree.getHexRoot();
console.log("merkleTree", merkleTree.toString());
console.log("rootHash", merkleTree.getHexRoot());

const handler: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    const address = req.query.address as string;
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
