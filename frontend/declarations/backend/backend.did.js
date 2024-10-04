export const idlFactory = ({ IDL }) => {
  const Puzzle = IDL.Record({
    'id' : IDL.Nat,
    'targetShape' : IDL.Text,
    'solution' : IDL.Record({
      'weight' : IDL.Nat,
      'size' : IDL.Nat,
      'opticalSize' : IDL.Nat,
      'style' : IDL.Text,
      'width' : IDL.Nat,
    }),
  });
  return IDL.Service({
    'getPuzzles' : IDL.Func([], [IDL.Vec(Puzzle)], ['query']),
    'validateSolution' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
