import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders navbar and home heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});


