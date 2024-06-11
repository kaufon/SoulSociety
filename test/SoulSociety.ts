import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SoulSociety", function() {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SoulSociety = await ethers.getContractFactory("SoulSociety");

    const contract = await SoulSociety.deploy();

    return { contract, owner, otherAccount };
  }
  it("Should open new request", async function() {
    const { contract, owner, otherAccount } = await loadFixture(deployFixture);
    const SoulSocietyContract = contract;
    const creator = "0x123";
    const title = "Test Title";
    const target = "Test Target";
    const description = "Test Description";
    const payment = ethers.parseEther("0.3");
    const targetLocation = "Test Location";

    await SoulSocietyContract.openRequest(
      creator,
      title,
      target,
      description,
      payment,
      targetLocation
    );

    const requestID = 1;

    const request = await SoulSocietyContract.requests(requestID);

    expect(request.title).to.equal(title);
    expect(request.creator).to.equal(creator);
    expect(request.target).to.equal(target);
    expect(request.description).to.equal(description);
    expect(request.payment.toString()).to.equal(payment.toString());
    expect(request.targetLocation).to.equal(targetLocation);
    expect(request.open).to.be.true;
    expect(request.timestamp).to.be.above(0); // Assuming block.timestamp is greater than 0
    expect(request.author).to.equal(request.author);
  });
});
