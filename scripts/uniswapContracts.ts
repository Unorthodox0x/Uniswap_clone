import { ethers } from "hardhat";
import { Contract, ContractFactory, ContractInterface, utils, BigNumber } from "ethers";
import {
	//ABI
	IWETHABI,
	Uniswapv3FactoryAbi,
	SwapRouterAbi,
	NFTDescriptorAbi,
	PositionDescriptorAbi,
	PositionManagerAbi,
	//BYTECODE
	IWETHBYTES,
	Uniswapv3FactoryBytes,
	SwapRouterBytes,
	NFTDescriptorBytes,
	PositionDescriptorBytes,
	PositionManagerBytes,
	//Contract|Network|Address
	customWeth,
	uniswapv3Factory,
	swapRouter,
	NFTdescriptor,
	PositionDescriptor,
	PositionManager,
} from "../Utils/Constants/ContractInfo";

//IMPORTED AFTER ALL CONTRACTS DEPLOYED
const customWethAddress=customWeth[0].Address;
const uniswapv3FactoryAddress=uniswapv3Factory[0].Address;
const swapRouterAddress=swapRouter[0].Address;
const NFTdescriptorAddress=NFTdescriptor[0].Address;

//GET BYTECODE of SMART CONTRACT to deploy own instance
const linkLibraries = (
  {
    bytecode,
    linkReferences,
  }: {
    bytecode: string
    linkReferences: {
      [fileName: string]: {
        [contractName: string]: { length: number; start: number }[]
      }
    }
  },
  libraries: { [libraryName: string]: string }
): string => {
  Object.keys(linkReferences).forEach((fileName) => {
    Object.keys(linkReferences[fileName]).forEach((contractName) => {
    	console.log('libraries', libraries)
    	console.log('contractName', contractName)
      if (!libraries.hasOwnProperty(contractName)) {
        throw new Error(`Missing link library name ${contractName}`)
      }
      const address = utils
        .getAddress(libraries[contractName])
        .toLowerCase()
        .slice(2)
      linkReferences[fileName][contractName].forEach(
        ({ start: byteStart, length: byteLength }) => {
          const start = 2 + byteStart * 2
          const length = byteLength * 2
          bytecode = bytecode
            .slice(0, start)
            .concat(address)
            .concat(bytecode.slice(start + length, bytecode.length))
        }
      )
    })
  })
  return bytecode
}

//DEPLOY CORE UNISWAP CONTRACTS
async function main() {
    const [owner] = await ethers.getSigners();

    // //deploy a Weth Token Contract
    // const Weth = new ContractFactory(IWETHABI, IWETHBYTES, owner);
    // const weth = await Weth.deploy();
		// console.log(`weth Address=`, `${weth.address}`)

		// //MAIN POOL FACTORY CONTRACT
  	// const Uniswapv3Factory = new ContractFactory(Uniswapv3FactoryAbi, Uniswapv3FactoryBytes, owner);
  	// const factory = await Uniswapv3Factory.deploy();
 		// await factory.deployed(); 
		// console.log(`factory Address=`, `${factory.address}`)

		// const SwapRouter = new ContractFactory(SwapRouterAbi, SwapRouterBytes, owner);
		// const swapRouter = await SwapRouter.deploy(factory.address, weth.address);
		// await swapRouter.deployed();
		// console.log(`swapRouter Address=`, `${swapRouter.address}`)

		// const NFTDescriptor = new ContractFactory(NFTDescriptorAbi, NFTDescriptorBytes, owner);
		// const nftdescriptor = await NFTDescriptor.deploy();
		// await nftdescriptor.deployed(); 
		// console.log(`nftdescriptor Address=`, `${nftdescriptor.address}`)

    //GET BYTE CODE REQUIRED SINCE NonFungibleTokenPositionDescriptorBytes DOES NOT WORK
    const linkedBytecode:string = linkLibraries({
    	bytecode: PositionDescriptorBytes,
    	linkReferences: {
    		"NFTDescriptor.sol":{
    			NFTDescriptor:[{
    				length: 20,
    				start:1261,
    			}]
    		}
    	}
    },{
    	NFTDescriptor: NFTdescriptorAddress,
    })
		const NonFungibleTokenPositionDescriptor = new ContractFactory(
			PositionDescriptorAbi,
			linkedBytecode,
			owner
		);
		const nonfungibleTokenPositionDescriptor = await NonFungibleTokenPositionDescriptor.deploy(customWethAddress);
		await nonfungibleTokenPositionDescriptor.deployed(); 
		console.log(`nonfungibleTokenPositionDescriptor Address=`, `${nonfungibleTokenPositionDescriptor.address}`)

	  const NonFungiblePositionManager = new ContractFactory(
	  	PositionManagerAbi,
			PositionManagerBytes,
			owner,
	  );
	  const nonfungiblePositionManager = await NonFungiblePositionManager.deploy(
	  	uniswapv3FactoryAddress,
	    customWethAddress,
	    nonfungibleTokenPositionDescriptor.address
	  );
	  await nonfungiblePositionManager.deployed(); 
		console.log(`nonfungiblePositionManager Address=`, `${nonfungiblePositionManager.address}`);
}

/*
	npx hardhat run --network localhost scripts/uniswapContracts.ts
*/

main()
.then(()=> process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
