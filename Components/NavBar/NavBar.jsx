import React, { useState, useEffect, useContext } from "react"
import { WalletContext } from "Context/WalletContext";

import Image from "next/image"
import Link from "next/link"
import Popup from "reactjs-popup";

import Style from "./NavBar.module.scss";
import images from "../../Assets";
import {WalletModal, TokenList} from "../index";

const NavBar = () => {
	//User Context
	const {account, userNetwork, tokenData, connectWallet} = useContext(WalletContext);	
	const menuItems = [{ 
		name: "Swap",
		link: "/"
	},{ 
		name: "Tokens",
		link: "/"
	},{ 
		name: "Pools",
		link: "/pool"
	}]

	const [openModal, setOpenModal] = useState(false);
	const [openTokenBox, setOpenTokenBox] = useState(false);

	return (
		<div className={Style.NavBar}>
			<div className={Style.box}>
				<div className={Style.left}>
					{/* Logo Image */}
					<div className={Style.img}>
						<Link href="/">
							<Image src={images.Uniswap} alt="logo" width={50} height={50}/>
						</Link>
					</div>
					{/* Menu Items */}
					<div className={Style.menu}>
						{menuItems.map((el, i) => (
							<Link
								key={i+1}
								href={{ pathname: `${el.name}` }}
							>
								<p className={Style.item}>{el.name}</p>
							</Link>
							))}
					</div>
				</div>

				{/* Middle Section */}
				<div className={Style.middle}>
					{/* Search Box */}
					<div className={Style.search}>
						<div className={Style.img}>
							<Image src={images.Search} alt="search" width={20} height={20} />
						</div>
						{/* Search Input */}
						<input type="text" placeholder="Search Tokens"/>
					</div>
				</div> 
				
				{/* Right Section */}
				<div className={Style.right}>
					<div className={Style.box}>
						<div className={Style.img}>
							<Image src={images.Eth} alt="Network" height={25} width={25} />
						</div>
						<p> {userNetwork} </p>
					</div>
					

					{/* LOGIC: Connect Wallet | View Tokens */}
					{ !account? (
						<button onClick={()=> setOpenModal(true)}> Connect </button>
					) : (
						<button onClick={()=> setOpenTokenBox(true)}> {account.substring(0, 10) + "..."} </button>
					)}

					{/* Wallet Connect Options*/}					
					{openModal && (
						<Popup
				            open={openModal}
				            className={Style.Popup.WalletConnect}
				            closeOnEscape={true}
				            onClose={() => setOpenModal(false)}
				          >
							<WalletModal 
								setOpenModal={setOpenModal} 
								connectWallet={connectWallet}
							/>
				          </Popup>
					)}

					{/* Wallet TokenList Component*/}
					{openTokenBox && (
						<Popup
				            open={openTokenBox}
				            className={Style.Popup.TokenList}
				            closeOnEscape={true}
				            onClose={() => setOpenTokenBox(false)}
				          >
							<TokenList  
								tokenData={tokenData} 
								setOpenTokenBox={setOpenTokenBox}
							/>
				          </Popup>
					)}


				</div>	
			</div>
		</div>
	)
}

export default NavBar;