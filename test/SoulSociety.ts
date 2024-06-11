import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SoulSociety } from "../typechain-types/factories/SoulSociety__factory.ts"; // Adjust the import path according to your project structure

describe("SoulSociety", function () {
  let soulSociety: SoulSociety;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    const SoulSocietyFactory = await ethers.getContractFactory("SoulSociety");
    soulSociety = await SoulSocietyFactory.deploy();
    await soulSociety.deployed();

    [owner, addr1] = await ethers.getSigners();
  });

  describe("Opening a request", function () {
    it("Should allow opening a new request", async function () {
      const result = await soulSociety.openRequest(
        "Creator Name",
        "Request Title",
        "Target Address",
        "Description of the request",
        ethers.utils.parseEther("100"), // Payment amount in wei
        "Target Location",
        { from: owner.address }
      );

      expect(result).to.not.be.reverted;
      expect(await soulSociety.requests(1)).to.deep.equal({
        id: 1,
        author: owner.address,
        title: "Request Title",
        target: "Target Address",
        description: "Description of the request",
        targetLocation: "Target Location",
        payment: ethers.utils.parseEther("100"),
        open: true,
        creator: "Creator Name",
        timestamp: await ethers.provider.getBlockNumber(),
      });
    });
  });
});

