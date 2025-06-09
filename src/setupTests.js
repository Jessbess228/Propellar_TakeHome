
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders zoom buttons', () => {
  render(<App />);
  expect(screen.getByText('+')).toBeInTheDocument();
  expect(screen.getByText('-')).toBeInTheDocument();
});

test('renders at least one tile', () => {
  render(<App />);
  const tiles = screen.getAllByRole('img');
  expect(tiles.length).toBeGreaterThan(0);
});

test('zooming in increases the number of tiles', () => {
  render(<App />);
  const plusButton = screen.getByText('+');
  const initialTiles = screen.getAllByRole('img').length;
  plusButton.click();
  const moreTiles = screen.getAllByRole('img').length;
  expect(moreTiles).toBeGreaterThan(initialTiles);
});