import {IPool, IPoolContext} from "./Pool";
import {defaultToken} from "../Token/defaultToken";


export const defaultPoolContext:IPoolContext = {
  tokenOne: defaultToken,
  setTokenOne: () => {},
  tokenTwo: defaultToken,
  setTokenTwo: ()=> {},
}

/**
 * This servers as a base model
 *  to describe/display a pool in app
 */
export const defaultPool:IPool = {
  Id: "",
  Address: "",
  tokenX:defaultToken,
  tokenY:defaultToken,
  fee: 0,
  Network: [{
    Name:"",
    Address: ""
  }],
}
