class Bot {
    makeMove(gamestate) {
        let ourMove;
        let dynamiteCount = 0;
        let opponentDynamiteCount = 0;
        let drawCount = 0;
        let currentRound = gamestate.rounds.length; //careful of 0-indexing here, round '1' is index '0'

        //Section 1 - coutning how many different moves have been made
        if (currentRound > 2) {
            for (let i = currentRound - 2; i < currentRound; i++) {
                if (gamestate.rounds[i].p2 === gamestate.rounds[i].p1) {
                    drawCount++;
                }
            }


        }

        if (currentRound >= 10) {
            for (let i = currentRound - 5; i < currentRound; i++) {
                if (gamestate.rounds[i].p2 === "D") {
                    opponentDynamiteCount++;
                }
            }
        }

        for (let round of gamestate.rounds) {
            if (round.p1 === "D") {
                dynamiteCount++;
            }
        }

        // Section 2 - Choosing the move to make

        /* Not currently using as we are randomizing w or D instead
        if(opponentDynamiteCount == 3 && gamestate.rounds[currentRound - 1].p1 != 'W' ){
            return 'W';
        } */

        if (drawCount >= 2 && dynamiteCount < 100) {
            //option to add randomness to use D or W here
            let randomIndex = Math.floor(2 * Math.random());
            ourMove = ['W', 'D'][randomIndex];;
            return ourMove;
        }
        // add if statement below such that if opponentDynamiteCount is extremely high in last numbers, then we switch to using waterballoon
        else if (dynamiteCount < 1) { // changed to 0 instead of removing entirely as reminder of earlier format; 
            let randomIndex = Math.floor(4 * Math.random());
            ourMove = ['R', 'P', 'S', 'D'][randomIndex];
            if (ourMove === 'D') {
                dynamiteCount++;
            }
        } else {
            let randomIndex = Math.floor(3 * Math.random());
            ourMove = ['R', 'P', 'S'][randomIndex];
        }
        return ourMove;

    }
}


module.exports = new Bot();

/* Possible strategies: 
1. Defensive strategies for specific situations. E.g. the opponent repeatedly uses dynamite - 
we should start to play water balloon until they stop
2.  When more than x number of games are drawn, use dynamite to win the tiebreaker rounds which are worth more points 

3. Scenario where oppontent e.g. JackPack uses many dynamites after draws, then after x rounds switches to water balloon: 

3. In scenarios where we win with water-balloon after a tiebreaker, blueBOTtle again uses water balloon in the next round. This shouldn't happen
*/