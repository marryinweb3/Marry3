/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Marry3Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Marry3Token__factory>;
    getContractFactory(
      name: "Marry3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Marry3__factory>;
    getContractFactory(
      name: "NFTokenEnumerableMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenEnumerableMock__factory>;
    getContractFactory(
      name: "NFTokenMetadataBaseUriMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenMetadataBaseUriMock__factory>;
    getContractFactory(
      name: "NFTokenMetadataEnumerableMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenMetadataEnumerableMock__factory>;
    getContractFactory(
      name: "NFTokenMetadataMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenMetadataMock__factory>;
    getContractFactory(
      name: "NFTokenMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenMock__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC520Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC520Token__factory>;
    getContractFactory(
      name: "ERC520",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC520__factory>;
    getContractFactory(
      name: "ERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Enumerable__factory>;
    getContractFactory(
      name: "ERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Metadata__factory>;
    getContractFactory(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TokenReceiver__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "NFTokenEnumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenEnumerable__factory>;
    getContractFactory(
      name: "NFTokenMetadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenMetadata__factory>;
    getContractFactory(
      name: "NFToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFToken__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "SupportsInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SupportsInterface__factory>;
    getContractFactory(
      name: "AddressUtilsMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AddressUtilsMock__factory>;
    getContractFactory(
      name: "NFTokenEnumerableTestMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenEnumerableTestMock__factory>;
    getContractFactory(
      name: "NFTokenMetadataEnumerableTestMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenMetadataEnumerableTestMock__factory>;
    getContractFactory(
      name: "NFTokenMetadataTestMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenMetadataTestMock__factory>;
    getContractFactory(
      name: "NFTokenReceiverTestMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenReceiverTestMock__factory>;
    getContractFactory(
      name: "NFTokenTestMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTokenTestMock__factory>;
    getContractFactory(
      name: "SendsToSelfOnConstruct",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SendsToSelfOnConstruct__factory>;

    getContractAt(
      name: "Marry3Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Marry3Token>;
    getContractAt(
      name: "Marry3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Marry3>;
    getContractAt(
      name: "NFTokenEnumerableMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenEnumerableMock>;
    getContractAt(
      name: "NFTokenMetadataBaseUriMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenMetadataBaseUriMock>;
    getContractAt(
      name: "NFTokenMetadataEnumerableMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenMetadataEnumerableMock>;
    getContractAt(
      name: "NFTokenMetadataMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenMetadataMock>;
    getContractAt(
      name: "NFTokenMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenMock>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC520Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC520Token>;
    getContractAt(
      name: "ERC520",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC520>;
    getContractAt(
      name: "ERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Enumerable>;
    getContractAt(
      name: "ERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Metadata>;
    getContractAt(
      name: "ERC721TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TokenReceiver>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "NFTokenEnumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenEnumerable>;
    getContractAt(
      name: "NFTokenMetadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenMetadata>;
    getContractAt(
      name: "NFToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFToken>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "SupportsInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SupportsInterface>;
    getContractAt(
      name: "AddressUtilsMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AddressUtilsMock>;
    getContractAt(
      name: "NFTokenEnumerableTestMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenEnumerableTestMock>;
    getContractAt(
      name: "NFTokenMetadataEnumerableTestMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenMetadataEnumerableTestMock>;
    getContractAt(
      name: "NFTokenMetadataTestMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenMetadataTestMock>;
    getContractAt(
      name: "NFTokenReceiverTestMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenReceiverTestMock>;
    getContractAt(
      name: "NFTokenTestMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTokenTestMock>;
    getContractAt(
      name: "SendsToSelfOnConstruct",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SendsToSelfOnConstruct>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}