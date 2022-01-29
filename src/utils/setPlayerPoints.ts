import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';

export default function setPlayersPoints(tourney: Tournament) {
  for (const player of tourney.players) {
    const matchesOfPlayer = tourney.matches.filter(
      (m) => m.playerOne.id === player.id || m.playerTwo.id === player.id
    );

    let [win, lose, draw] = [0, 0, 0];
    let gamePoints = 0;
    let matchPoints = 0;
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    for (const match of matchesOfPlayer) {
      const {
        result: { d, p1, p2 },
      } = match;

      if (player.id === match.playerOne.id) {
        gamePoints += p1 * 3 + d * 1;
        if (p1 > p2) {
          matchPoints += 3;
          win += 1;
        } else if (p1 < p2) {
          lose += 1;
          matchPoints += 0;
        } else if (p1 == p2) {
          draw += 1;
          matchPoints += 1;
        } else if (p1 == p2 && d === 1) {
          matchPoints += 1;
          draw += 1;
        }
      }
      if (player.id === match.playerTwo.id) {
        gamePoints = p2 * 3 + d * 1;
        if (p2 > p1) {
          matchPoints += 3;
          win += 1;
        } else if (p2 < p1) {
          matchPoints += 0;
          lose += 1;
        } else if (p1 == p2) {
          matchPoints += 1;
          draw += 1;
        } else if (p1 == p2 && d === 1) {
          matchPoints += 1;
          draw += 1;
        }
      }
    }
    tourney.players[playerIndex] = {
      ...player,
      tiebreakers: {
        ...player.tiebreakers,
        summary: {
          w: win,
          l: lose,
          d: draw,
        },
        gamePoints,
        matchPoints,
      },
    };
  }

  return tourney;
}