import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import App from './App';

describe('App', () => {
  it('Render App', () => {
    render(<App />);

    const inputElement = screen.getByLabelText('Enter repo URL');
    const buttonElement = screen.getByRole('button', { name: 'Load issues' });

    expect(buttonElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
});
