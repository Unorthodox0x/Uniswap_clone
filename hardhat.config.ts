import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import fs from "fs";

const projectKey = "4e6dcf03a62b405491b3c2341e4a94fd";
const privateKey = fs.readFileSync(".secret").toString();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
      // accounts: [],
      // gas: 2100000, 
      // gasPrice: 8000000000
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${projectKey}`,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
};

export default config;
