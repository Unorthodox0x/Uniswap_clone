import React, {useState, useEffect, useContext} from "react";
import Image from "next/image";

import Style from "../styles/PoolPage.module.scss";
import image from "../Assets";
import {CreatePool, ConnectPool} from "../Components/index";
import {PoolContextProvider} from "../Context/PoolContext";

const PoolPage = () => {

	return (
		<PoolContextProvider>
			<div className={Style.PoolPage}>
				<CreatePool />
				<ConnectPool />
			</div>
		</PoolContextProvider>
	);
}

export default PoolPage;