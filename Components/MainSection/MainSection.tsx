import React, {useState, useEffect, useContext} from "react";
import { WalletContext } from "../../Context/WalletContext";
import Image from "next/image";

import Style from "./MainSection.module.scss"
import images from "../../Assets";
import {Token, SearchToken } from "../index"
import {defaultToken, Token as TokenModel, MainProps}  from "../../Models/index";

//ACTIONS
import { singleSwap } from "../../Utils/Contracts/Swap";
import { fetchQuote } from "../../Utils/Price/PriceUtils";

const MainSection = ({ account, tokenData }:MainProps) => {

	//Global context
	const {connectWallet} = useContext(WalletContext);
	//states
	const [openSetting, setOpenSetting] = useState<boolean>(false);
	const [openToken, setOpenToken] = useState<boolean>(false);
	const [openTokenTwo, setOpenTokenTwo] = useState<boolean>(false);
	const [swapAmount, setSwapAmount] = useState<number>(0)
	const [expectedOutput, setExpectedOutput] = useState<string>("");
	//TOKEN 1
	const [tokenOne, setTokenOne] = useState<TokenModel>(defaultToken);
	//TOKEN 2
	const [tokenTwo, setTokenTwo] = useState<TokenModel>(defaultToken);

	const getQuote = async():Promise<void> => {
		//TODO: useQuery;
		const quote = await fetchQuote(tokenOne, tokenTwo, Number(swapAmount))
		if(!quote) return setExpectedOutput("0")
		setExpectedOutput(quote.toString());
	}

	return (
		<div className={Style.MainSection}>
			<div className={Style.box}>
				<div className={Style.heading}>
					<h4>Swap</h4>
					<div className={Style.img}>
						<Image 
							src={images.Options} 
							alt="image"
							width={25}
							height={25}
							onClick={()=> setOpenSetting(true)}
						/>
					</div>
				</div>
				
				{/* Token One Info */}
				<div className={Style.token}>
					<div className={Style.input}>
						<div className={Style.fixed}>
							<span className={Style.Half}>Half</span>
							<span className={Style.Max}>Max</span>
						</div>
						<input 
							type="text" 
							placeholder="0"
							defaultValue={swapAmount}
							pattern={"[0-9]*"}
							required
							onChange={(e)=> ( setSwapAmount(Number(e.target.value)) )}
						/>
					</div>

					<div className={Style.token_info}>
						<button
							onClick={()=>setOpenToken(true)}
						>
							<Image src={tokenOne.img || images.Eth} width={20} height={20} alt="image"/>
							{tokenOne.symbol || "Select"}
						</button>
						<div className={Style.balance}>
							<small>balance: {tokenOne.balance}</small>
						</div>
					</div>
				</div>

				{/* Token Two Info */}
				<div className={Style.token}>
					
					<div className={Style.input}>
						<input type="text" placeholder="0" defaultValue={expectedOutput} />
					</div>

					<div className={Style.token_info}>
						<button
							onClick={()=>setOpenTokenTwo(true)}
						>
							<Image src={tokenTwo.img || images.Eth} width={20} height={20} alt="image"/>
							{tokenTwo.symbol || "Select"}
						</button>
						<div className={Style.balance}>
							<small>balance: {tokenTwo.balance}</small>
						</div>
					</div>
				</div>

				{/* Account Info */}
				{account && !!expectedOutput? (
					<button 
						className={Style.btn}
						onClick={()=> singleSwap(tokenOne, tokenTwo, Number(swapAmount))}
					>
						Swap
					</button>
				): account && !expectedOutput ? (
					<button 
						className={Style.btn}
						onClick={()=> getQuote()}
					>
						get quote
					</button>	
				):
					<button 
						className={Style.btn}
						onClick={()=> connectWallet()}
					>
						Connect Wallet
					</button>
				}
			</div>

			{openSetting && (
				<Token
					setOpenSetting={setOpenSetting}
				/>
			)}
			{openToken && (
				<SearchToken
					setOpenToken={setOpenToken}
					setToken={setTokenOne}
					tokenData={tokenData}
				/>
			)}
			{openTokenTwo && (
				<SearchToken
					setOpenToken={setOpenTokenTwo}
					setToken={setTokenTwo}
					tokenData={tokenData}
				/>
			)}
		</div>
	)
}

export default MainSection;