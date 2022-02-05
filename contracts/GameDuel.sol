// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract GameDuel {
    struct Game {
        address player1;
        address player2;
        uint256 player1Points;
        uint256 player2Points;
        address winner;
        uint256[2][] config;
    }

    uint nonce = 0;

    Game[] public games;
    int256 public test = 5;

    function publishScore(uint256 gameId, uint256 score) public returns (bool) {
        Game storage game = games[gameId];
        if(game.player1 == msg.sender) {
            game.player1Points = score;
            return true;
        } else if(game.player2 == msg.sender) {
            game.player2Points = score;
            finishGame(game);
            return true;
        } else {
            return false;
        }
    }

    function finishGame(Game storage game) internal {
        if(game.player1Points > game.player2Points) {
            game.winner = game.player1;
        } else if(game.player2Points > game.player1Points) {
            game.winner = game.player2;
        } else {
            game.winner = 0x000000000000000000000000000000000000dEaD;
        }
    }

    function createGame() private returns (uint256[2][] memory) {
        if(games.length > 0) {
            // Check if player 1 already have an Game open
            Game storage lastGame = games[games.length - 1];
            require(lastGame.player1 != msg.sender, "You already have a game open!");
        }

        address placeholder = 0x0000000000000000000000000000000000000000;

        uint8 size = 10;
        uint256[2][] memory config = new uint256[2][](size*2);
        for (uint i = 0; i < size; i++) {
            uint256 x = random(39);
            uint256 y = random(29);
            uint256[2] memory p;
            p[0] = x;
            p[1] = y;
            config[i] = p;
        }

        Game memory game = Game(msg.sender, placeholder, 0, 0, placeholder, config);
        games.push(game);
        return config;
    }

      function random(uint max) internal returns (uint256) {
        uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % max;
        //randomnumber = randomnumber + 100;
        nonce++;
        return uint256(randomnumber);
    }

    function getGamesCount() public view returns (uint) {
        return games.length;
    }

    function getConfig(uint gameId) public view returns (uint256[2][] memory) {
        Game memory game = games[gameId];
        return game.config;
    }

    function play() public returns (uint256[2][] memory) {
        // check if there is any game
        if (games.length > 0) {
            Game storage lastGame = games[games.length - 1];
            if (
                lastGame.player2 == 0x0000000000000000000000000000000000000000
                && lastGame.player1 != msg.sender
            ) {
                // if yes -> join game
                lastGame.player2 = msg.sender;
                return lastGame.config;
            }
        }

        // else
        return createGame();
    }
}
