import { promisify } from 'util';
import initialGridStrings from './initialGridStrings';
import { tick } from '.';

const wait = promisify(setTimeout);

// SETTINGS
const initialGridString = initialGridStrings.spaceships.glider;
const intervalBetweenFrames = 300;

const main = async () => {
  let gridString = initialGridString;
  /* eslint-disable no-console, no-constant-condition, no-await-in-loop */
  while(true) {
    console.clear();
    console.log(gridString);
    gridString = tick(gridString)
    await wait(intervalBetweenFrames);
  }
  /* eslint-enable no-console, no-constant-condition, no-await-in-loop */
}

main();
