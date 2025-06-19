import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fake News Detector heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Fake News Detector/i);
  expect(headingElement).toBeInTheDocument();
});