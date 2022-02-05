pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IOTABOTS.sol";

contract BOLTS is ERC20, ERC20Burnable, Ownable {
    IOTABOTS public iotabots;

    constructor(
        string memory _name,
        string memory _symbol,
        IOTABOTS _iotabots
    ) ERC20(_name, _symbol) {
        iotabots = _iotabots;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    mapping(uint256 => uint256) public lockTime;

    //allow users to call the requestTokens function to mint tokens
    function requestTokens() external {
        // check if the sender has an IOTABOT NFT

        uint256[] memory bots_ids = iotabots.walletOfOwner(msg.sender);

        require(
            bots_ids.length > 0,
            "You don't have permissios for that. You need an IOTABOT NFT."
        );

        for (uint256 i = 0; i < bots_ids.length; i++) {
            //perform a few check to make sure function can execute
            require(
                block.timestamp > lockTime[bots_ids[i]],
                "lock time has not expired. Please try again later"
            );

            //mint tokens
            _mint(msg.sender, 100);

            //updates locktime 1 day from now
            lockTime[bots_ids[i]] = block.timestamp + 1 days;
        }
    }
}
