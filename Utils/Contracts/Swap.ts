import { ethers, BigNumber } from "ethers";
import { getNetwork } from "../Wallet/WalletUtils";
import {
	getContractAddressByNetwork, 
	createContractInstance, 
	connectContract
} from "../Contracts/ContractUtils";
import { fundContract } from "../Transfer/TransferUtils";
import {
	ERC20ABI,
	IWETHABI,
	singleSwapToken,
	SingleSwapTokenABI,
	swapMultiHop,
	SwapMultiHopABI,
} from "../Constants/ContractInfo";
//@Types
import { Token } from "../../Models/index";


//ACTION: SWAP SINGLE TOKENX FOR TOKENY
export const singleSwap = async (tokenX:Token, tokenY:Token, swapAmount:number) => {
	if(tokenX.name==="" || tokenY.name==="" || Number.isNaN(swapAmount)) return null;

	const network:string = await getNetwork();
	//CONFIRM SELECTED TOKEN CONTRACTS EXIST | CAN CONNECT
	const tokenXAddress:string = await getContractAddressByNetwork(tokenX.Network, network);
	const tokenYAddress:string = await getContractAddressByNetwork(tokenY.Network, network);
	const singleSwapAddress:string = await getContractAddressByNetwork(singleSwapToken, network);
	
	//MAKE CONTRACT INSTANCE TO ACCESS FUNCTIONS
	const tokenXContract = await connectContract(
		tokenXAddress, 
		tokenX.type==="ERC20"? ERC20ABI: IWETHABI
	);
	const swapContract = await connectContract(singleSwapAddress, SingleSwapTokenABI);
	if(!tokenXContract || !swapContract) return null; //could not connect

	//MAKE FUNDS ACCESSIBLE TO SINGLESWAP CONTRACT
	await fundContract(tokenXContract, singleSwapAddress, tokenX.type, swapAmount)

    //SWAP
	const txn = await swapContract.swapExactInputSingle(
		tokenXAddress, 
		tokenYAddress, 
		swapAmount,
		{ gasLimit: 300000 }
	);
	console.log("pre - txn", txn);
	txn.wait();
	console.log("post - txn", txn);

	//amountOut
	// const contract = connectContract(Address, Abi);	
}

//==================SwapMultiHop==========================
//CONNECTING WITH SwapMultiHop CONTRACT
// export const swapMultiHop = async () => {
// 	try{
// 		const web3modal = new Web3Modal();
// 		const connection = await web3modal.connect();
// 		const provider = new etheres.providers.Web3Provider(connection);
// 		const signer = provider.getSigner();
// 		const contract = fetchSwapMultiHopContract(signer);
// 		return contract;
// 	}catch (error) {
// 		console.log('error', error)
// 	}
// }