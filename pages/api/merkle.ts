import { NextApiHandler } from "next";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const whitelistAddress = [
  "0x51cd587FFEFa6484Caf9fe647409Ac50209735A5",
  "0xda368039bB7E6DC77f913C023FeBb1AD6F404EA9",
  "0xc6A5309dEC5bf7EB71409BA5d876567B1D0a6c62",
  "0x18Db6752c36b64D5aAe1B740C10ad941a269a076",
  "0x3876FA6B277D1f0a684Ed7f094A3c3a72Af94ead",
  "0xE44E871C8328ACA6ae03921471DE177DEF1fC116",
  "0xF44Af422751BA425621bc4cFe5e778b4B6F651b4",
  "0x9e4FE5Ae63C4847C167622F8219559f21c8d0420",
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
