import {Pool} from "./Pool";
import {defaultToken} from "../Token/defaultToken";
/**
 * This servers as a base model
 *  to describe/display a pool in app
 */
export const defaultPool:Pool = {
  Id: "",
  pair: [{defaultToken}, {defaultToken}],
  Network: [{
    name:"",
    Address: ""
  }],
  fee: 0,
}