import Contract_Network_Info from "../Contract/contract";

export declare interface Token {
  name: string,
  symbol: string,
  type: string,
  img: StaticImageData,
  Network: [Contract_Network_Info],
  balance: number
}