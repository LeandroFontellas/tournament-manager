import { Player } from '..';

export default function readableStandings(standings: Player[]) {
  for (const standing of standings) {
    console.table({ ...standing.tiebreakers, nickname: standing.nickname });
  }
}