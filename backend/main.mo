import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  // Define puzzle type
  type Puzzle = {
    id: Nat;
    targetShape: Text;
    solution: {
      size: Nat;
      weight: Nat;
      style: Text;
    };
  };

  // Store puzzles
  stable var puzzles : [Puzzle] = [
    { id = 1; targetShape = "A"; solution = { size = 48; weight = 700; style = "normal" } },
    { id = 2; targetShape = "B"; solution = { size = 36; weight = 300; style = "italic" } },
    { id = 3; targetShape = "C"; solution = { size = 72; weight = 900; style = "normal" } },
  ];

  // Get all puzzles
  public query func getPuzzles() : async [Puzzle] {
    puzzles
  };

  // Validate solution
  public func validateSolution(puzzleId: Nat, size: Nat, weight: Nat, style: Text) : async Bool {
    switch (Array.find<Puzzle>(puzzles, func(p) { p.id == puzzleId })) {
      case (null) { false };
      case (?puzzle) {
        puzzle.solution.size == size and
        puzzle.solution.weight == weight and
        puzzle.solution.style == style
      };
    };
  };
}
