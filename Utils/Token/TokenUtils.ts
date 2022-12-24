import { ethers, BigNumber } from "ethers";
//Internal
import { tokenList } from "../Constants/AvailableTokens";
//Smart Contract
import {ERC20ABI, IWETHABI} from "../Constants/ContractInfo";
import {getContractAddressByNetwork, connectContract} from "../Contracts/ContractUtils";
//Types
import { Token } from "../../Models/index";

/**
 * @parmas {provider} | object??
 * @params {network} | string
 * @params {tokenData} | useState<Token[]>
 */
//GET USERS BALANCE OF ALL SUPPORTED TOKENS 
export const getTokenBalance = async(
	provider: ethers.providers.Web3Provider,
	account:string, //Connected Address
	network:string, //Connected Network Name
	tokenData:Token[]
):Promise<void> => {	
	//GET TOKEN BALANCES
	tokenList.map(async(el:Token) => {
		//Get contract, 
		const contractAddress = await getContractAddressByNetwork(el.Network, network);
		if(!contractAddress) return;
		const contract = await connectContract(
			contractAddress,
			el.type==="ERC20"? ERC20ABI: IWETHABI,	
		);

		//return human readable balance for each token
		const tokenValue:number = await convertTokenBalance(account, provider, network, contract, el.symbol, el.type);

		//CREATE LIST TOKENDATA | prevent duplicate add token
		if(!tokenData.some(el => el.Network[0].Address === contractAddress)){
			tokenData.push({
				name: el.name,
				symbol: el.symbol,
				type: el.type,
				img: el.img,
				Network:[{
					name: network,
					Address: contractAddress,
				}],
				balance: tokenValue
			});
		}
	});
}

//CONVERT BALANCE TO READABLE NUMBER
export const convertTokenBalance = async(
	account:string, //Connected Address
	provider:ethers.providers.Web3Provider, 
	network:string,  //Connected Network Name
	contract,  //Contract Instance
	tokenSymbol:string, //ex. "Eth"
	tokenType:string //"ERC20"||"IWETH"
):Promise<number> => {
	if(!account || !provider || !network || !contract || !tokenSymbol || !tokenType) {
		console.error('Unable to fetch balance')
		return 0;
	}
	
	let balance:BigNumber, convertedBal:string, tokenValue:string;
	switch(tokenSymbol){
		case 'ETH': //Chain native eth token
			balance = await provider.getBalance(account);
			convertedBal = BigNumber.from(balance).toString();
			tokenValue = formatEtherValue(convertedBal);
			break;
		default:
			//Get && Convert User Token Balance
			balance = await contract.balanceOf(account)
			convertedBal = BigNumber.from(balance).toString();
			tokenValue = 
				tokenType==="IWETH" 
				? formatEtherValue(convertedBal)
				: tokenType==="ERC20" 
				? await formatERC20Value(contract, convertedBal)
				: "0"
			break;
	}
	return parseFloat(tokenValue);
}

export function formatEtherValue(value:string):string {
	return parseFloat(
		ethers.utils.formatEther(value)
		).toFixed(6)
}

//DETERMIN NUMBER OF DECIMALS
export async function formatERC20Value(tokenContract, value:string):Promise<string> {
	const decimals = await tokenContract.decimals();
	return (parseFloat(value) / 10 ** decimals).toFixed(6)
}