import { isSamePlayer, Player } from './types/player';
import { advantage, deuce, fifteen, forty, FortyData, game, Point, PointsData, Score, thirty } from './types/score';
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

export const scoreWhenGame = (winner: Player): Score => {
  throw new Error('not implemented');
};

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  throw new Error('not implemented');
};

export const score = (currentScore: Score, winner: Player): Score => {
  throw new Error('not implemented');
};
function matchOpt(arg0: () => import("./types/score").Deuce, arg1: (p: any) => Score): (a: import("fp-ts/lib/Option").None | import("fp-ts/lib/Option").Some<import("./types/score").Fifteen> | import("fp-ts/lib/Option").Some<import("./types/score").Thirty>) => Score {
  throw new Error('Function not implemented.');
}