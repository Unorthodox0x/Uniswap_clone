import Web3Modal from "web3modal";
import { ethers } from "ethers";
// import detectEthereumProvider from '@metamask/detect-provider';

//CHECK IF WALLET CONNECTED
export const checkWalletConnected = async():Promise<string> => {
	try {
		const provider:ethers.providers.Web3Provider|null = await defaultProvider();
		if(!provider) return "";
		const [owner] = await window.ethereum.request({
			method: "eth_accounts"
		});
		return owner;
	} catch(error){
		console.error(error)
		return "";
	}
}

//CONNECT WALLET
export const connectwallet = async():Promise<string> => {
	try {
		if(!window.ethereum) {
			console.log("Install Metamask") 
			return "";
		}
		const [owner] = await window.ethereum.request({
			method: "eth_requestAccounts"
		});
		return owner;
	} catch(error){
		console.error(error)
		return "";
	}
}

//CREATE PROVIDER
export const defaultProvider = async():Promise<ethers.providers.Web3Provider|null> => {
	if(!window.ethereum) return null;
	return new ethers.providers.Web3Provider(window.ethereum);
}

//@note THIS PROMPTS METAMASK TO OPEN
export const web3ModalProvider = async ():Promise<ethers.providers.Web3Provider> => {
	const web3modal = new Web3Modal({ 
		cacheProvider: false,
		disableInjectedProvider:false,
	});
	await web3modal.clearCachedProvider();
	const connection = await web3modal.connect(); //permission required here
	return new ethers.providers.Web3Provider(window.ethereum);
}

export const getNetwork = async():Promise<string> => {
	const provider:ethers.providers.Web3Provider|null = await defaultProvider();
	if(!provider) return "";
	const networkInfo = await provider.getNetwork()
	return networkInfo.name;
}