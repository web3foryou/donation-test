const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donation", function () {
  it("makeDonation and donationOf", async function () {
    const [owner] = await ethers.getSigners();

    const Donation = await ethers.getContractFactory("Donation");

    const hardhatDonation = await Donation.deploy();

    let amount = ethers.utils.parseEther("1.0");

    let overrides = {
      value: amount
    };
    await hardhatDonation.makeDonation(overrides);

    const ownerBalance = await hardhatDonation.donationOf(owner.address);
    expect(ownerBalance).to.equal(amount);
  });

  it("withdrawal", async function () {
    const [, recepient] = await ethers.getSigners();


    const balanceRecepient = await recepient.getBalance();

    const Donation = await ethers.getContractFactory("Donation");

    const hardhatDonation = await Donation.deploy();

    let amount = ethers.utils.parseEther("1.0");

    let overrides = {
      value: amount
    };
    await hardhatDonation.makeDonation(overrides);

    await hardhatDonation.withdrawal(recepient.address, amount);

    const balanceRecepientEnd = await recepient.getBalance();

    expect(balanceRecepientEnd).to.equal(balanceRecepient.add(amount));
  });

  it("withdrawal more output than available", async function () {
    const [, recepient] = await ethers.getSigners();

    const Donation = await ethers.getContractFactory("Donation");

    const hardhatDonation = await Donation.deploy();

    let amount = ethers.utils.parseEther("1.0");

    let overrides = {
      value: amount
    };
    await hardhatDonation.makeDonation(overrides);

    let amountW = ethers.utils.parseEther("10.0");

    await expect(hardhatDonation.withdrawal(recepient.address, amountW))
        .to.be.revertedWith('Failed to send Ether');
  });

  it("withdrawal without owner", async function () {
    const [, recepient] = await ethers.getSigners();

    const Donation = await ethers.getContractFactory("Donation");

    const hardhatDonation = await Donation.deploy();

    let amount = ethers.utils.parseEther("1.0");

    let overrides = {
      value: amount
    };
    await hardhatDonation.makeDonation(overrides);

    await expect(hardhatDonation.connect(recepient).withdrawal(recepient.address, amount))
        .to.be.revertedWith('Not owner');
  });

  it("viewDonators and unique", async function () {
    const [owner, user] = await ethers.getSigners();

    const Donation = await ethers.getContractFactory("Donation");

    const hardhatDonation = await Donation.deploy();

    let amount = ethers.utils.parseEther("1.0");

    let overrides = {
      value: amount
    };
    await hardhatDonation.makeDonation(overrides);

    await hardhatDonation.connect(user).makeDonation(overrides);

    await hardhatDonation.connect(user).makeDonation(overrides);

    let donators = await hardhatDonation.viewDonators();

    expect(donators.length).to.equal(2);
    expect(donators[0]).to.equal(owner.address);
    expect(donators[1]).to.equal(user.address);
  });

  it("calcDonation", async function () {

    const Donation = await ethers.getContractFactory("Donation");

    const hardhatDonation = await Donation.deploy();

    let amount = ethers.utils.parseEther("1.0");

    let balance = await hardhatDonation.calcDonation(amount, amount);

    expect(balance).to.equal(amount.add(amount));
  });

  it("calcDonation overflow", async function () {
    const Donation = await ethers.getContractFactory("Donation");

    const hardhatDonation = await Donation.deploy();

    let amount = BigInt(2 ** 256) - BigInt("1");

    let balance = await hardhatDonation.calcDonation(amount, amount);

    expect(balance).to.equal(amount);
  });
});
