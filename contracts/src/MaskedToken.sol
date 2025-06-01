// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MaskedToken is ERC20 , Ownable {
    
    uint256 public tokenPricePerEth;


    constructor (uint256 initialSupply, uint256 _tokenPricePerEth) ERC20('MaskedToken', "MTK") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
        tokenPricePerEth = _tokenPricePerEth;
    }

    function buyTokens() public payable {
        require(msg.value > 0, "Must send more than 0 ETH to buy tokens");
        require(tokenPricePerEth != 0, "Token  price is not set yet");
        uint256 tokensToMint = (msg.value  * tokenPricePerEth) / 1e18;
        require(tokensToMint > 0, "You have to mint more than 0 tokens");
        _mint(msg.sender, tokensToMint);
        (bool success,) = owner().call{value:msg.value}("");
        require(success, "Failed to transfer ETH to owner to mint tokens");
    }


    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to,amount);
    }

    function setTokenPricePerEth(uint256 newPrice) public onlyOwner {
        tokenPricePerEth = newPrice;
    }
}