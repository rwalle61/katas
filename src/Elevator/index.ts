import { Floors, Call, Calls } from './types';

export const callOnce = (call: Call): Floors => [
  call.pickupFloor,
  call.dropoffFloor,
];

export const callSequentially = (calls: Calls): Floors =>
  calls.reduce(
    (stopsSoFar, call): Floors => [...stopsSoFar, ...callOnce(call)],
    [],
  );

const uniques = (array: any[]) => Array.from(new Set(array));

const handleUpwardCalls = (calls: Calls): Floors => {
  const stops = callSequentially(calls);
  const uniqueStops = uniques(stops);
  uniqueStops.sort((a, b) => a - b);
  return uniqueStops;
};

const handleDownwardCalls = (calls: Calls): Floors => {
  const stops = callSequentially(calls);
  const uniqueStops = uniques(stops);
  uniqueStops.sort((a, b) => b - a);
  return uniqueStops;
};

const isCallUpward = (call: Call): boolean =>
  call.pickupFloor < call.dropoffFloor;
const isCallDownward = (call: Call): boolean => !isCallUpward(call);

const combineStops = (stops1: Floors, stops2: Floors) => {
  const [firstOf2ndStops, ...rest] = stops2;
  const lastOf1stStops = [...stops1].pop();
  return [...stops1, ...(firstOf2ndStops === lastOf1stStops ? rest : stops2)];
};

const handleUpwardThenDownwardCalls = (
  calls: Calls,
  indexOfFirstDownwardCall: number,
) => {
  const upwardCalls = calls.slice(0, indexOfFirstDownwardCall);
  const downwardCalls = calls.slice(indexOfFirstDownwardCall);
  const downwardStops = handleDownwardCalls(downwardCalls);
  const upwardStops = handleUpwardCalls(upwardCalls);
  return combineStops(upwardStops, downwardStops);
};

const handleDownwardThenUpwardCalls = (
  calls: Calls,
  indexOfFirstUpwardCall: number,
) => {
  const downwardCalls = calls.slice(0, indexOfFirstUpwardCall);
  const upwardCalls = calls.slice(indexOfFirstUpwardCall);
  const downwardStops = handleDownwardCalls(downwardCalls);
  const upwardStops = handleUpwardCalls(upwardCalls);
  return combineStops(downwardStops, upwardStops);
};

export const callInBatch = (calls: Calls): Floors => {
  const indexOfFirstUpwardCall = calls.findIndex(isCallUpward);
  if (indexOfFirstUpwardCall === -1) {
    return handleDownwardCalls(calls);
  }

  const indexOfFirstDownwardCall = calls.findIndex(isCallDownward);
  if (indexOfFirstDownwardCall === -1) {
    return handleUpwardCalls(calls);
  }

  const firstCall = calls[0];
  if (isCallDownward(firstCall)) {
    return handleDownwardThenUpwardCalls(calls, indexOfFirstUpwardCall);
  }

  return handleUpwardThenDownwardCalls(calls, indexOfFirstDownwardCall);
};
