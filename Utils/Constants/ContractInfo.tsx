import ERC20 from "../ContractABI/Token.json";
import IWETH from "../ContractABI/IWETH.json";
import SingleSwapToken from "../ContractABI/SingleSwapToken.json";
import SwapMultiHop from "../ContractABI/SwapMultiHop.json";
import QuoterAbi from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { Contract_Network_Info } from "../../Models/Token";

//Goerli ERC20
export const ERC20ABI = ERC20.abi;
export const TrashAddress:string = "0xbE304974f2A056E3A6B400c5480DdEaCC9bA76dc";
export const DabloonAddress:string = "0xc2bC9443Ef73f8d7ba3FF5acb7189aB3CD4286AB";
export const EthAddress:string = "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D";
export const WBtcAddress:string = "0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05";
export const UniAddress:string = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
export const ChainLinkAddress:string = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
export const MaticAddress:string = "0xA108830A23A9a054FfF4470a8e6292da0886A4D4";
export const USDCAddress:string = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

//Goerli IWETH
export const IWETHABI = IWETH.abi;
export const IWETHAddress:string = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; //Goerli
export const DaiAddress:string = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"; //Goerli


//Goerli SingleSwapToken
export const SingleSwapTokenAddress = "0xACA8D690c9081262d99BEa8c75453948F1D53202";
export const SingleSwapTokenABI = SingleSwapToken.abi;
export const singleSwapToken:Contract_Network_Info[] = [{
	name: "goerli",
	Address: SingleSwapTokenAddress
}]

//Goerli Quoter 
export const SingleSwapQuoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
export const QuoterABI = QuoterAbi.abi;
export const singleSwapQuoter:Contract_Network_Info[] = [{
	name: "goerli",
	Address: SingleSwapQuoterAddress
}];

//Goerli SWAPMULTIHOP
export const SwapMultiHopAddress = "0x1Aac5De2AB1d5763594e585F1377A27290954F68";
export const SwapMultiHopABI = SwapMultiHop.abi;
export const swapMultiHop:Contract_Network_Info[] = [{
	name: "goerli",
	Address: SwapMultiHopAddress
}]


