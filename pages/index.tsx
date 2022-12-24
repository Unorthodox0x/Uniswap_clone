import React, {useState, useEffect, useContext} from "react";
import { WalletContext } from "../Context/WalletContext";
import {MainSection} from "../Components/index";
import {Token} from "../Models/index";

const Home = () => {

  //account:string, tokenData:Token[];  
  const {account, tokenData} = useContext(WalletContext);

  return (
    <div>
      <MainSection
        account={account}
        tokenData={tokenData}
       />
    </div>
  );
}

export default Home;