import { backend } from './declarations/backend/index.js';

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
  try {
    puzzles = await backend.getPuzzles();
    console.log("Puzzles loaded:", puzzles);
    if (puzzles.length === 0) {
      throw new Error("No puzzles available");
    }
    loadPuzzle();
  } catch (error) {
    console.error("Error initializing game:", error);
    feedback.textContent = "Failed to load puzzles. Please refresh the page.";
    disableControls();
  }
}

function loadPuzzle() {
  if (currentPuzzle >= puzzles.length) {
    feedback.textContent = "Congratulations! You've completed all puzzles!";
    disableControls();
    return;
  }

  const puzzle = puzzles[currentPuzzle];
  targetShape.textContent = puzzle.targetShape;
  updatePlayerShape();
  enableControls();
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
  if (currentPuzzle >= puzzles.length) {
    feedback.textContent = "All puzzles completed. Cannot submit.";
    return;
  }

  const size = parseInt(sizeInput.value);
  const weight = parseInt(weightInput.value);
  const style = styleInput.value;

  console.log(`Submitting solution: Puzzle ID: ${puzzles[currentPuzzle].id}, Size: ${size}, Weight: ${weight}, Style: ${style}`);

  try {
    const result = await backend.validateSolution(puzzles[currentPuzzle].id, size, weight, style);
    console.log(`Validation result:`, result);
    if (result) {
      feedback.textContent = "Correct! Moving to next puzzle.";
      score += 1;
      scoreValue.textContent = score;
      currentPuzzle += 1;
      setTimeout(loadPuzzle, 1500);
    } else {
      feedback.textContent = "Not quite right. Try again!";
    }
  } catch (error) {
    console.error("Error submitting solution:", error);
    feedback.textContent = "An error occurred. Please try again.";
  }
}

function disableControls() {
  sizeInput.disabled = true;
  weightInput.disabled = true;
  styleInput.disabled = true;
  submitButton.disabled = true;
}

function enableControls() {
  sizeInput.disabled = false;
  weightInput.disabled = false;
  styleInput.disabled = false;
  submitButton.disabled = false;
}

sizeInput.addEventListener('input', updatePlayerShape);
weightInput.addEventListener('input', updatePlayerShape);
styleInput.addEventListener('change', updatePlayerShape);
submitButton.addEventListener('click', submitSolution);

initGame();
