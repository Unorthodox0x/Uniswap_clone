import Contract_Network_Info from "../Contract/contract";
import Token from "../Token/Token";

export declare interface Pool {
  Id: string,
  pair: FixedLengthArray<[Token, Token]>,
  Network: [Contract_Network_Info]
  fee:number
}
