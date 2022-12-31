import {IToken} from "../Token/Token";

export declare interface IWalletContext {
  	account:string|null,
	userNetwork:string|null,
	tokenData:IToken[],
	connectWallet:Function,
}