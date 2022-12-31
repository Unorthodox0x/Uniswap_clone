import {IWalletContext} from "./WalletContext";
import {defaultToken} from "../Token/defaultToken";

/**
 * This servers as a base model
 *  to describe/display a token in app
 */
export const defaultWalletContext:IWalletContext = {
  	account:"",
	userNetwork:"",
	tokenData:[defaultToken],
	connectWallet: async():Promise<void>=>{},
}