import {Token} from "./Token";
import images from "../../Assets/index"
/**
 * This servers as a base model
 *  to describe/display a token in app
 */
export const defaultToken:Token = {
  name:"Ether",
  symbol: "Eth",
  type:"ETH",
  img: images.Eth,
  Network:[{
    name:"",
    Address:""
  }],
  balance:0
}