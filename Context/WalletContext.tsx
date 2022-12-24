import React, { useState, useEffect, createContext } from "react";
import {ethers} from "ethers";
import {
    checkWalletConnected,
    connectwallet,
    getNetwork,
	defaultProvider,
	web3ModalProvider
} from "../Utils/Wallet/WalletUtils";
import {
	getTokenBalance,
	convertTokenBalance
} from "../Utils/Token/TokenUtils";
import {
	createContractInstance
} from "../Utils/Contracts/ContractUtils";

//@Types
import { defaultToken, Token}  from "../Models/index";

// import {Token, defaultToken} from "../Models/Token"
/**
 * This goal of object serves as a global state manager 
 *     for a singed in user
 */
export const WalletContext = createContext({});

export const WalletProvider = ({ children }) => {
	if(!children) return null;

	//STATE
	const [provider, setProvider] = useState<ethers.providers.Web3Provider|null>(null); 
	const [account, setAccount] = useState<string>(""); //address
	const [userNetwork, setUserNetwork] = useState<string>(""); //name
	const [tokenData, setTokenData] = useState<Token[]>([defaultToken]);

	//REQUEST CONNECT WALLET 
	const connectWallet = async():Promise<void> => {
		setAccount(await connectwallet());
	}

	//FETCH CONNECTED WALLET DATA
	const fetchWalletConnection = async():Promise<void> => {
		try{
			//GET USER ACCOUNT
			setProvider(await defaultProvider());
			//GET ACCOUNT ADDRESS
			setAccount(await checkWalletConnected());
			// GET NETWORK
			setUserNetwork(await getNetwork());
		} catch(error) {
			console.error(error)
		}
	}

	//ON PAGE LOAD
	useEffect(()=> { fetchWalletConnection() }, []);

	useEffect(()=> {
		if(!!account && !!userNetwork && !!provider){
			// POPULATE UX WITH USER'S TOKEN INFO
			getTokenBalance(provider, account, userNetwork, tokenData);
		}
	},[account, userNetwork, provider])

	return(
		<WalletContext.Provider
			value={{
				account,
				userNetwork,
				tokenData,
				connectWallet,
			}}
		>
			{children}
		</WalletContext.Provider>
		)

}