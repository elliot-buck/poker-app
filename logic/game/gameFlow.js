import { getStageFunction, startGame } from '.';
import { setStage } from '../state';

const STAGES = {
  'pre-flop': 0,
  'flop': 1,
  'turn': 2,
  'river': 3,
}

export const playGame = async (difficulty, turnLength, equityDisplay, helpDisplay, startingChips, bigBlind) => {
  startGame(difficulty, turnLength, equityDisplay, helpDisplay, startingChips, bigBlind);

  for (let index = 0; index < 3; index++) {
    const roundResult = await playRound();
    console.log('Round result:', roundResult);
  }
}

export const playRound = async () => {
  for (const [stageID, stageNumber] of Object.entries(STAGES)) {
    const stageResult = await runStage(stageID, stageNumber);

    if (stageResult) return stageResult;
  }

  throw new Error('Each round must have at least 1 winner');
}

export const runStage = async (stageID, stageNumber) => {
  const stageFunction = getStageFunction(stageID);
  setStage(stageNumber);

  console.log('STARTING STAGE', stageID)

  return await stageFunction();
}