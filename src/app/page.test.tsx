import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock the Lenis library and any other dependencies
jest.mock('lenis', () => {
  return jest.fn().mockImplementation(() => ({
    raf: jest.fn(),
    destroy: jest.fn(),
    scrollTo: jest.fn(),
  }));
});

// Mock your settings context
jest.mock('./context/settings-context', () => ({
  useSettings: () => ({
    isLenisEnabled: false, // Disable for simpler testing
  }),
}));

describe('Home Page', () => {
  it('renders the name correctly', () => {
    render(<Home />);
    
    // Use getByText instead of getByLabelText for text content
    expect(screen.getByText('Dominikus Sebastian Ramli')).toBeInTheDocument();
  });

  it('renders the role/description', () => {
    render(<Home />);
    expect(screen.getByText('Aspiring Software Developer & Data Analyst')).toBeInTheDocument();
  });

  it('renders social media links', async () => {
    render(<Home />);
    expect(screen.getByTestId('github-link')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-link')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-link')).toBeInTheDocument();
   });
});

