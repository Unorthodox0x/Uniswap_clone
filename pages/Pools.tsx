import React, {useState, useEffect, useContext} from "react";
import Image from "next/image";

import Style from "../styles/PoolPage.module.scss";
import image from "../Assets";
import {CreatePool, ConnectPool} from "../Components/index";

const PoolPage = () => {

	return (
		<div className={Style.PoolPage}>
			<CreatePool />
			<ConnectPool />
		</div>
	);
}

export default PoolPage;