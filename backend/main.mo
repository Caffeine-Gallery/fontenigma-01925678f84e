import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  type Puzzle = {
    id: Nat;
    targetShape: Text;
    solution: {
      size: Nat;
      weight: Nat;
      width: Nat;
      opticalSize: Nat;
      style: Text;
    };
  };

  stable var puzzles : [Puzzle] = [
    { id = 1; targetShape = "A"; solution = { size = 48; weight = 700; width = 100; opticalSize = 48; style = "normal" } },
    { id = 2; targetShape = "B"; solution = { size = 36; weight = 300; width = 75; opticalSize = 36; style = "italic" } },
    { id = 3; targetShape = "C"; solution = { size = 72; weight = 900; width = 125; opticalSize = 72; style = "normal" } },
  ];

  public query func getPuzzles() : async [Puzzle] {
    puzzles
  };

  public func validateSolution(puzzleId: Nat, size: Nat, weight: Nat, width: Nat, opticalSize: Nat, style: Text) : async Bool {
    switch (Array.find<Puzzle>(puzzles, func(p) { p.id == puzzleId })) {
      case (null) { false };
      case (?puzzle) {
        puzzle.solution.size == size and
        puzzle.solution.weight == weight and
        puzzle.solution.width == width and
        puzzle.solution.opticalSize == opticalSize and
        puzzle.solution.style == style
      };
    };
  };
}
