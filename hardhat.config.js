require("@nomiclabs/hardhat-waffle");
require('solidity-coverage')
require("dotenv").config()



const ALCHE_KEY = process.env.ALCHE_KEY
const PK_1 = process.env.PK_1
const PK_2 = process.env.PK_2
const PKG_1 = process.env.PKG_1
const PKG_2 = process.env.PKG_2

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      gasLimit: 6000000000,
      accounts: [PKG_1, PKG_2]
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/" + ALCHE_KEY,
      accounts: [PK_1, PK_2]
    }
  },
  solidity: "0.8.11",
};
