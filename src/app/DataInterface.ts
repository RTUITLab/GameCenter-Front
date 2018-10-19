export interface IAllGames {
    gameName: string;
    gameId: string;
    state: string;
}
export interface IPickedGames {
    gameName: string;
    gameId: string;
}
export interface IQueue {
  gameName: string;
  userName: string;
  status: string;
  playerId: string;
  gameId: string;
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

