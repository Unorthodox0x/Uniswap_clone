import React, {useState, useEffect} from "react";
import Image from "next/image";

import Style from "./ConnectPool.module.scss";
import images from "../../Assets";

const ConnectPool = () => {

	return (
		<div className={Style.ConnectPool}>
			<div className={Style.box}>
				{/* HEADER */}
				<div className={Style.header}>
					<h2>Pool</h2>
					 <p>New Position</p>
				</div>

				<div className={Style.middle}>
					<Image src={images.Wallet} alt="Wallet" height={80} width={80}/>
					<p> 
					
					</p>
				</div>
			</div>
		</div>
	);
}

export default ConnectPool;