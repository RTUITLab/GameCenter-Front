export interface IAllGames {
    name: string;
    gameId: string;
    state: string;
}
export interface IPickedGames {
    name: string;
    gameId: string;
}
export interface IQueue {
  gameName: string;
  username: string;
  status: string;
  playerId: string;
  gameTypeId: string;
}
export interface IRating {
    scoreId: string;
    name: string;
    score: string;
    date: string;
  }
export interface ITop {
    gamename: string;
    username: string;
    scoreCount: Number;
}
export interface ILast {
    gameName: string;
    username: string;
    scoreCount: Number;
}

