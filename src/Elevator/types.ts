enum Floor {
  Basement = -1,
  Ground = 0,
  One = 1,
  Two = 1,
  Three = 1,
}

export type Floors = Floor[];

export type Call = {
  pickupFloor: Floor;
  dropoffFloor: Floor;
};

export type Calls = Call[];
