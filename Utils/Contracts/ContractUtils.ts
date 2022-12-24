import { ethers, BigNumber } from "ethers";
import { defaultProvider, getNetwork } from "../Wallet/WalletUtils";
import { fundContract } from "../Transfer/TransferUtils";
import {
	ERC20ABI,
	IWETHABI,
	swapMultiHop,
	SwapMultiHopABI,
} from "../Constants/ContractInfo";
//@Types
import { Contract_Network_Info, Token } from "../../Models/index";

//GET CONTRACT FOR USER'S CONNECTED NETWORK
export const getContractAddressByNetwork = async(el:Contract_Network_Info[], network:string):Promise<string> => {
	const ContractInfo:Contract_Network_Info[] = el.filter((nestEl:Contract_Network_Info)=> (
		nestEl.name === network
	))
	if(ContractInfo.length<1) return ""; //network not supported
	return ContractInfo[0].Address;
}

//CREATE INSTANCE OF ANY CONTRACT TO ACCESS FUNCTIONS
export const createContractInstance = (Address:string, Abi, signerOrProvider) => 
	new ethers.Contract(Address, Abi, signerOrProvider);

//CONNECTING WITH ANY ERC20 CONTRACT
export const connectContract = async(Address:string, Abi) => {
	if(!Address || !Abi) return null;
	try{
		const provider:ethers.providers.Web3Provider|null = await defaultProvider();
		const contract = createContractInstance(Address, Abi, provider);
		return contract;
	}catch (error) {
		console.log('error', error)
		return null;
	}
}