import React, {useState, useEffect, useContext} from "react";
import Image from "next/image";

import Style from "./CreatePool.module.scss";
import images from "../../Assets";
import { Token, SearchToken } from "../index";
import {defaultToken, Token as TokenModel}  from "../../Models/index";

import { WalletContext } from "../../Context/WalletContext";


const CreatePool = () => {
  	
  	const {account, tokenData} = useContext(WalletContext);

	//OPEN OPTIONS
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openTokenModal, setOpenTokenModal] = useState<boolean>(false);

	//TOKEN 1
	const [openToken, setOpenToken] = useState<boolean>(false);
	const [tokenOne, setTokenOne] = useState<TokenModel>(defaultToken);
	//TOKEN 2
	const [openTokenTwo, setOpenTokenTwo] = useState<boolean>(false);
	const [tokenTwo, setTokenTwo] = useState<TokenModel>(defaultToken);

	const [active, setActive] = useState<number>(1); //index of active pool?
 	
 	const [openFee, setOpenFee] = useState<boolean>(false);
 	const [minPrice, setMinPrice] = useState<number>(0)
 	const [maxPrice, setMaxPrice] = useState<number>(0)
 
 	const feePairs = [{
 		fee: "0.05%",
 		info: "Best for stable pairs",
 		number: "0% Select"
 	},{
 		fee: "0.3%",
 		info: "Best for stable pairs",
 		number: "0% Select"
 	},{
 		fee: "1%",
 		info: "Best for stable pairs",
 		number: "0% Select"
 	}] 

 	const minPriceRange = (text:string):void => {
 		if(text === "+") setMinPrice(minPrice+1);
 		if(text === "-") setMinPrice(minPrice-1);
 	}
 	const maxPriceRange = (text:string):void => {
 		if(text === "+") setMaxPrice(maxPrice+1);
 		if(text === "-") setMaxPrice(maxPrice-1);	
 	} 

	return (
		<div className={Style.CreatePool}>
			<div className={Style.box}>

				{/* POOL SECTION HEADER */}
				<div className={Style.header}>
					<div className={Style.left}>
						<Image 
							src={images.ArrowLeft} 
							alt="image" 
							width={25} 
							height={25} 
						/>
					</div>
					<div className={Style.middle}>
						<p>Add Liquidity</p>
					</div>
					<div className={Style.right}>
						<p>Clear All</p>
						<Image
							src={images.Cross}
							alt="Close"
							width={35}
							height={35}
							onClick={()=> setOpenModal(false)}
						/>
					</div>
				</div>

				{/* SELECT PRICE RANGE */}
				<div className={Style.price}>
					{/* LEFT */}
					<div className={Style.left}>
						<h4>Select Pair</h4>
						{/*TOKEN INFO*/}
						<div className={Style.token}>
							
							{/*TOKEN INFO*/}
							<div 
								className={!account 
									? Style.info_disabled 
									: Style.info_active
								}
								onClick={() => (
									account && ( setOpenToken(true) ) 
								)}
							> 
								<p>
									<Image 
										src={tokenOne.img}
										alt="token"
										width={20}
										height={20}
									/>
								</p>
								<p>
									{tokenOne.name}
								</p>
							</div>
							{/*TOKEN INFO*/}
							<div 
								className={!account 
									? Style.info_disabled 
									: Style.info_active
								}
								onClick={() => (
									account && ( setOpenTokenTwo(true) ) 
								)}
							>
								<p>
									<Image
										src={tokenTwo.img}
										alt="token"
										width={20}
										height={20}
									/>
								</p>
								<p>
									{tokenTwo.name}
								</p>
							</div>
						</div>

						{/* FEE SELECT SECTION */}
						<div className={Style.fee}>
							<h4>Fee tier</h4>
							
							<div className={Style.list}>
								{feePairs.map((el,i) => (
									<div 
										className={Style.item}
										key={i+1}
										onClick={() => setActive(i+1)}
									>
										<div className={Style.info}>
											<p>{el.fee}</p>
											<p> 
												{active === i+1 && (
													<Image 
														src={images.FilledCheck}
														alt="image"
														width={20}
														height={20}
													/>
												)}
											</p>
										</div>
										<small>{el.info}</small>
										<p className={Style.para}>
											{el.number}
										</p>
									</div>
								))}
							</div>
						</div>
						{/* DEPOSIT AMOUNT */}
						<div className={Style.deposit}>
							<h4>Deposit Amount</h4>

							{/* DEPOSIT TOKEN INFO */}
							<div className={Style.box}>
								<input type="text" placeholder="0"/>
								<div className={Style.input}>
									<p>
										<small>
											{tokenOne.symbol}
										</small> 
										{tokenOne.name}
									</p>
									<p className={Style.balance}>
										Balance: {tokenOne.balance}
									</p>
								</div>
							</div>

							{/* DEPOSIT TOKEN INFO */}
							<div className={Style.box}>
								<input type="text" placeholder="0"/>
								<div className={Style.input}>
									<p>
										<small>
											{tokenTwo.symbol}
										</small>
										{tokenOne.name}
									</p>
									<p className={Style.balance}>
										Balance: {tokenTwo.balance}
									</p>
								</div>
							</div>
						</div>
					</div>


					{/* RIGHT */}
					<div className={Style.right}>
						<h4>Set Price Range</h4>
						<div className={Style.box}>
							<p className={Style.para}>
								Current Price: 41.1494 TOKEN per ETH
							</p>
							<Image 
							 	src={images.Wallet}
							 	alt="wallet"
							 	height={80}
							 	width={80}
							/>
							<h3>Your position will appear here.</h3>
						</div>

						{/* PRICE RANGE */}
						<div className={Style.range}>
							{/* Min Price */}
							<div className={Style.box}>
								<p>Min Price</p>
								<p
									className={Style.para}
									onClick={(e)=> minPriceRange(e.target.innerText)}
								>
									<small>-</small> {minPrice} <small>+</small>
								</p>
								<p>Token per Eth</p>
							</div>

							{/* MAX PRICE */}
							<div className={Style.box}> 
								<p>Max Price</p>
								<p
									className={Style.para}
									onClick={(e)=> maxPriceRange(e.target.innerText)}
								>
									<small>-</small> {maxPrice} <small>+</small>
								</p>
								<p>TOken per Eth</p>
							</div>
						</div>
					
						{/* PRICE RANGE BUTTONS*/}
						<div className={Style.button}>
							<button>Full Range</button>
						</div>
						<div className={Style.amount}>
							<button>Enter amount</button>
						</div>
					</div>
				</div>

			</div>


			{/* TOKEN POPUPS */}
			{openModal && (
				<div className={Style.token}>
					<Token setOpenSetting={setOpenModal}/>
				</div>
			)}

			{openToken && (
				<div className={Style.token}>
					<SearchToken
						setOpenToken={setOpenToken}
						setToken={setTokenOne}
						tokenData={tokenData}
					/>
				</div>
			)}
			{openTokenTwo && (
				<div className={Style.token}>
					<SearchToken
						setOpenToken={setOpenTokenTwo}
						setToken={setTokenTwo}
						tokenData={tokenData}
					/>
				</div>
			)}

		</div>
	);
};

export default CreatePool;