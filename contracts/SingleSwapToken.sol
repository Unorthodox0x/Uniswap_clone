// SPDX-License-Identifier: GPL-2.0-or-Later
pragma solidity >=0.7.0 < 0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken{
	
	//Uniswap ISwapRouter contract
	ISwapRouter public immutable swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

	uint24 public poolFee = 3000; //0.3%
	function setPoolFee(uint24 _fee) external {
		poolFee = _fee;
	}

	function swapExactInputSingle(address tokenX, address tokenY, uint256 amountIn) external returns (uint256 amountOut) {
        // Transfer the specified amount to this contract
        TransferHelper.safeTransferFrom(tokenX, msg.sender, address(this), amountIn);
        // Approve the router to spend
        TransferHelper.safeApprove(tokenX, address(swapRouter), amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: tokenX,
                tokenOut: tokenY,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
	}
}