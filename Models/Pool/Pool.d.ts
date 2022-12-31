import {ethers, BigNumber, Contract, ContractInterface} from "ethers";
import Contract_Network_Info from "../Contract/contract";
import {IToken} from "../Token/Token";
import {Token} from "uniswap/sdk-core";

export declare interface IPoolContext {
  tokenOne:IToken,
  setTokenOne: React.Dispatch<React.SetStateAction<IToken>>,
  tokenTwo:IToken,
  setTokenTwo: React.Dispatch<React.SetStateAction<IToken>>,
}

export declare interface IPool {
  Id: string,
  Address: string,
  tokenX: IToken,
  tokenY: IToken,
  Network: [Contract_Network_Info]
  fee:number
}

export declare interface Immutables {
  factory: string
  token0: string
  token1: string
  fee: number
  tickSpacing: number
  maxLiquidityPerTick: BigNumber
}

export declare interface State {
  liquidity: BigNumber
  sqrtPriceX96: BigNumber
  tick: number
  observationIndex: number
  observationCardinality: number
  observationCardinalityNext: number
  feeProtocol: number
  unlocked: boolean
}

export declare interface PoolTokens {
  tokenXAddress: string,
  tokenXAbi: ContractInterface,
  tokenXContract: Contract,
  tokenXDecimals:number, 
  tokenXSymbol:string, 
  tokenXName:string,
  tokenYAddress: string,
  tokenYAbi: ContractInterface,
  tokenYContract: Contract,
  tokenYDecimals:number, 
  tokenYSymbol:string,
  tokenYName:string,
  TOKENX: Token,
  TOKENY: Token,
}

