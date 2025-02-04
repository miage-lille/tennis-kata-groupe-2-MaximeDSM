import { isSamePlayer, Player } from './types/player';
import { advantage, deuce, fifteen, forty, FortyData, game, love, Point, points, PointsData, Score, thirty } from './types/score';
import { none, Option, some, match } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string =>
  point.kind;

export const scoreToString = (score: Score): string =>
  score.kind;

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};

export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};

export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    match(
      () => deuce(),
      p => forty(currentForty.player, p) as Score
    )
  );
};

export const scoreWhenGame = (winner: Player): Score => game(winner);

const newGame: Score = points(love(), love());

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  if (current.PLAYER_ONE.kind === "THIRTY" && winner === "PLAYER_ONE") {
    return forty(winner, current.PLAYER_ONE);
  } else if (current.PLAYER_TWO.kind === "THIRTY" && winner === "PLAYER_TWO") {
    return forty(winner, current.PLAYER_TWO);
  } else if (winner === "PLAYER_ONE") {
    let pointPlayerOne : Point = love();
    switch (current.PLAYER_ONE.kind) {
      case ("LOVE") :
        pointPlayerOne = fifteen();
      case ("FIFTEEN") :
        pointPlayerOne = thirty();
    }
    return {
      kind: 'POINTS',
      pointsData: {
        PLAYER_ONE: pointPlayerOne,
        PLAYER_TWO: current.PLAYER_TWO
      }
    }
  } else if (winner === "PLAYER_TWO") {
    let pointPlayerTwo : Point = love();
    switch (current.PLAYER_TWO.kind) {
      case ("LOVE") :
        pointPlayerTwo = fifteen();
      case ("FIFTEEN") :
        pointPlayerTwo = thirty();
    }
    return {
      kind: 'POINTS',
      pointsData: {
        PLAYER_ONE: current.PLAYER_ONE,
        PLAYER_TWO: pointPlayerTwo
      }
    }
  }
  return {
    kind: 'POINTS',
    pointsData: {
      PLAYER_ONE: love(),
      PLAYER_TWO: love()
    }
  }
};

const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};

function matchOpt(arg0: () => import("./types/score").Deuce, arg1: (p: any) => Score): (a: import("fp-ts/lib/Option").None | import("fp-ts/lib/Option").Some<import("./types/score").Fifteen> | import("fp-ts/lib/Option").Some<import("./types/score").Thirty>) => Score {
  throw new Error('Function not implemented.');
}