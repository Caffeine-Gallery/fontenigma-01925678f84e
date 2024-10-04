import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Puzzle {
  'id' : bigint,
  'targetShape' : string,
  'solution' : { 'weight' : bigint, 'size' : bigint, 'style' : string },
}
export interface _SERVICE {
  'getPuzzles' : ActorMethod<[], Array<Puzzle>>,
  'validateSolution' : ActorMethod<[bigint, bigint, bigint, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
