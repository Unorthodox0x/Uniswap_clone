import React, { useState, useEffect, createContext } from "react";
import {ethers} from "ethers";
import {Token, CurrencyAmount, TradeType, Percent} from "@uniswap/sdk-core"; 
import {
    createContractInstance
} from "../Utils/Contracts/ContractUtils";
import {
    getPoolPrice,
    getPoolImmutables,
    getPoolState,
} from "../Utils/Pools/PoolUtils";
import {
    swapUpdatePrice,
} from "../Utils/Price/PriceUtils";

//@Types
import { 
    defaultToken, IToken,
    defaultPool, defaultPoolContext, IPoolContext
}  from "../Models/index";
import {
    singleSwap
} from "../Utils/Swap/SwapUtils";

/**
 * This goal of object serves as a global state manager 
 *     for a singed in user
 */
export const PoolContext = createContext<IPoolContext>(defaultPoolContext);

export const PoolContextProvider = ({ children }) => {
    if(!children) return null;

    //TOKEN PAIR
    const [tokenOne, setTokenOne] = useState<IToken>(defaultToken);
    const [tokenTwo, setTokenTwo] = useState<IToken>(defaultToken);

    return(
        <PoolContext.Provider
            value={{
                tokenOne,
                setTokenOne,
                tokenTwo,
                setTokenTwo
            }}
        >
            {children}
        </PoolContext.Provider>
        )

}