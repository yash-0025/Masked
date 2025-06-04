// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import 'forge-std/Script.sol';
import "../src/MaskedToken.sol";
import "../src/Masked.sol";


contract DeployScript is Script {

    uint256 public constant INITIAL_TOKEN_SUPPLY = 1_000_000 * 10**18;
    uint256 public TOKEN_PRICE_PER_ETH = 1_000_000_000 * 10**18;

    uint256 public constant INITIAL_POST_COST = 5 * 10**18;
    uint256 public constant INITIAL_MESSAGE_COST = 1 * 10**18;


    function run() public returns (MaskedToken maskedToken, Masked masked) {

        string memory deployerPrivateKeyHX = string.concat("0x", vm.envString("PRIVATE_KEY"));
        uint256 deployerPrivateKey = vm.parseUint(deployerPrivateKeyHX);

        vm.startBroadcast(deployerPrivateKey);

        maskedToken = new MaskedToken(INITIAL_TOKEN_SUPPLY, TOKEN_PRICE_PER_ETH);
        console.log("Masked Token Deployed at :: ", address(maskedToken));
        
        masked = new Masked(address(maskedToken), INITIAL_POST_COST, INITIAL_MESSAGE_COST);
        console.log("Masked contract Deployed at :: ", address(masked));

        vm.stopBroadcast();
    }
}