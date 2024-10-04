import { backend } from 'declarations/backend';

let currentPuzzle = 0;
let puzzles = [];
let score = 0;

const targetShape = document.getElementById('target-shape');
const playerShape = document.getElementById('player-shape');
const sizeInput = document.getElementById('size');
const weightInput = document.getElementById('weight');
const styleInput = document.getElementById('style');
const submitButton = document.getElementById('submit');
const feedback = document.getElementById('feedback');
const scoreValue = document.getElementById('score-value');

async function initGame() {
  puzzles = await backend.getPuzzles();
  loadPuzzle();
}

function loadPuzzle() {
  if (currentPuzzle >= puzzles.length) {
    feedback.textContent = "Congratulations! You've completed all puzzles!";
    submitButton.disabled = true;
    return;
  }

  const puzzle = puzzles[currentPuzzle];
  targetShape.textContent = puzzle.targetShape;
  updatePlayerShape();
}

function updatePlayerShape() {
  const size = sizeInput.value;
  const weight = weightInput.value;
  const style = styleInput.value;

  playerShape.style.fontSize = `${size}px`;
  playerShape.style.fontWeight = weight;
  playerShape.style.fontStyle = style;

  document.getElementById('size-value').textContent = size;
  document.getElementById('weight-value').textContent = weight;
}

async function submitSolution() {
  const size = parseInt(sizeInput.value);
  const weight = parseInt(weightInput.value);
  const style = styleInput.value;

  const result = await backend.validateSolution(puzzles[currentPuzzle].id, size, weight, style);

  if (result) {
    feedback.textContent = "Correct! Moving to next puzzle.";
    score += 1;
    scoreValue.textContent = score;
    currentPuzzle += 1;
    setTimeout(loadPuzzle, 1500);
  } else {
    feedback.textContent = "Not quite right. Try again!";
  }
}

sizeInput.addEventListener('input', updatePlayerShape);
weightInput.addEventListener('input', updatePlayerShape);
styleInput.addEventListener('change', updatePlayerShape);
submitButton.addEventListener('click', submitSolution);

initGame();
