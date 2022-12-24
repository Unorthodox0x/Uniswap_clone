import {
	//ERC20 goerli
	TrashAddress,
	DabloonAddress,
	EthAddress,
	WBtcAddress,
	UniAddress,
	ChainLinkAddress,
	MaticAddress,
	USDCAddress,
	//IWETH goerli
	IWETHAddress,
	DaiAddress,
	//ABI
	IWETHABI,
	ERC20ABI,
} from "./ContractInfo";
import { Token } from "../../Models/Token";
import images from "../../Assets/index";

export const tokenList:Token[] = [{
	name: "Trash",
	symbol: "RAC",
	type: "ERC20",
	img: images.RaccoonLogo,
	Network:[{
	    name: "goerli",
	    Address: TrashAddress
  	}],
  	balance:0
},{
	name: "Dubloon",
	symbol: "DUB",
	type: "ERC20",
	img: images.Eth,
	Network:[{
	    name: "goerli",
	    Address: DabloonAddress
  	}],
  	balance:0
},{
	name: "Ethereum",
	symbol: "ETH",
	type: "ETH",
	img: images.Eth,
	Network:[{
	    name: "goerli",
	    Address: EthAddress
  	}],
  	balance:0
},{
	name: "Wrapped Bitcoin",
	symbol: "WBTC",
	type: "ERC20",
	img: images.Bitcoin,
	Network:[{
	    name: "goerli",
	    Address: WBtcAddress
  	}],
  	balance:0
},{
	name: "Uniswap",
	symbol: "UNI",
	type: "ERC20",
	img: images.Uniswap,
	Network:[{
	    name: "goerli",
	    Address: UniAddress
  	}],
  	balance:0
},{
	name: "USDC",
	symbol: "USDC",
	type: "ERC20",
	img: images.USDC,
	Network:[{
	    name: "goerli",
	    Address: USDCAddress
  	}],
  	balance:0
},{
	name: "IWETH",
	symbol: "IWETH",
	type: "IWETH",
	img: images.Eth,
	Network:[{
	    name: "goerli",
	    Address: IWETHAddress
  	}],
  	balance:0
},{
	name: "Dai",
	symbol: "Dai",
	type: "ERC20",
	img: images.Dai,
	Network:[{
	    name: "goerli",
	    Address: DaiAddress
  	}],
  	balance:0
},{
	name: "ChainLink",
	symbol: "LINK",
	type: "ERC20",
	img: images.ChainLink,
	Network:[{
	    name: "goerli",
	    Address: ChainLinkAddress
  	}],
  	balance:0
},{
	name: "Matic",
	symbol: "MATIC",
	type: "ERC20",
	img: images.Matic,
	Network:[{
	    name: "goerli",
	    Address: MaticAddress
  	}],
  	balance:0
}]