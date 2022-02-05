// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Game is Ownable {
  
  uint constant gameFee = 0 ether; // 0.005 ether;
  uint constant minPrice = 0 ether; // 0.01 ether;
  uint constant minHerosToken = 0 ether; // 5 ether;

  //address public cryptoHerosGame = 0x0;
  uint256 public maxSingleGameId = 0;

  uint nonce = 0;
  IERC721 cryptoHerosToken;

  struct SingleGame {
    address player;
    uint256 userResult;
    uint256 contractResult;
    uint256 playerBet;
    uint8 game; // 0: smaller. 1: greater
    uint8 result; // 0 user win, 1 contract win, 2 draw
  }

  SingleGame[] public singleGames;

  mapping(address => uint256[]) public usersSingleGames;

  constructor(IERC721 _cryptoHerosToken) public { 
    cryptoHerosToken = _cryptoHerosToken;
  }

   event gamePlayed(address winner, uint _player_bet, uint _bot_bet);



//   function createSingleGame(uint _tokenId, uint _bet) payable public returns (address, uint, uint) {
  function createSingleGame(uint _tokenId, uint _bet) payable public returns(bool) {
    require(_bet >= 0, "Bet to low, please bet between 0 and 2");
    require(_bet <= 2, "Bet to high, please bet between 0 and 2");
    require(msg.value >= minPrice);
    require(address(this).balance >= minHerosToken);
    require(cryptoHerosToken.ownerOf(_tokenId) == msg.sender);

    // 0 : Rock
    // 1 : Papers
    // 2 : Scissors

    uint bot_bet = random();

    address winner = 0x0000000000000000000000000000000000000000;

    if (
      (_bet == 0 && bot_bet == 2) || // Rock bets Scissors
      (_bet == 1 && bot_bet == 0) || // Papers bets Rock
      (_bet == 2 && bot_bet == 1)   //  Scissorsbets Papers
     ) {
      winner = msg.sender;
    //   return true;
    } else if (
      (bot_bet == 0 && _bet == 2) || // Rock bets Scissors
      (bot_bet == 1 && _bet == 0) || // Papers bets Rock
      (bot_bet == 2 && _bet == 1)   //  Scissorsbets Papers
    ) {
      winner = address(this);
    //   return false;
    }

    if (winner != 0x0000000000000000000000000000000000000000) {
    //   _token.transferFrom(address(this), winner, _token.balanceOf(address(this)));
    }
    emit gamePlayed(winner, _bet, bot_bet);
    return true;
  }

  function random() internal returns (uint) {
    uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % 3;
    //randomnumber = randomnumber + 100;
    nonce++;
    return randomnumber;
}

  // function readUserGamesCount(address _address, uint _idx) public returns (uint){
  //   return usersSingleGames[_address][_idx].length;
  // }

  function getUserSingleGames(address _address) external view returns (uint256[] memory) {
    return usersSingleGames[_address];
  }

  function withdraw(uint amount) public payable onlyOwner returns(bool) {
    require(amount <= address(this).balance);
    // owner.transfer_balance(amount);
    return true;
  }

}