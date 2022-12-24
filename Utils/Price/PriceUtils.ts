import { ethers, BigNumber } from "ethers";
import { getNetwork } from "../Wallet/WalletUtils";
import { getContractAddressByNetwork, connectContract } from "../Contracts/ContractUtils";
import {
	QuoterABI,
	singleSwapQuoter,
} from "../Constants/ContractInfo";
//@Types
import { Token } from "../../Models/index";

export const fetchQuote = async(tokenX:Token, tokenY:Token, swapAmount:number) => {
	if(tokenX.name==="" || tokenY.name==="" || Number.isNaN(swapAmount)) return null;
	
	const network:string = await getNetwork();
	//CONFIRM SELECTED TOKEN CONTRACTS EXIST | CAN CONNECT
	const tokenXAddress:string = await getContractAddressByNetwork(tokenX.Network, network);	
	const tokenYAddress:string = await getContractAddressByNetwork(tokenY.Network, network);
	
	const QuoterAddress:string = await getContractAddressByNetwork(singleSwapQuoter, network);
	const quoterContract = await connectContract(QuoterAddress, QuoterABI);
	if(!quoterContract) return null;

	//need logic to fetch a decimal count depending on the type of contract;

	// const amountIn = Number(swapAmount) * 10 ** 18;
	// console.log('swapAmount', ethers.utils.formatEther( amountIn ))
	// console.log('swapAmount', ethers.utils.formatEther( amountIn ))

	const quote = await quoterContract.callStatic.quoteExactInputSingle(
		tokenXAddress,
		tokenYAddress,
		3000,//fee //must fee be exact?
		Number(swapAmount), //amountin
		0
	)

	console.log('quote', quote)
	return quote;
}