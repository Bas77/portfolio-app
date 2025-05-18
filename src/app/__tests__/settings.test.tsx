import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsButton } from '../component/settings-button';
import { SettingsSidebar } from '../component/settings-sidebar';
// import { SettingsProvider } from '../context/settings-context';

// Mock window.matchMedia
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

describe('Settings Components', () => {
  describe('SettingsButton', () => {
    it('renders correctly and toggles sidebar', async () => {
      render(<SettingsButton />);
      
      const button = screen.getByTestId('settings-button');
      await userEvent.click(button);
      
      // Verify the sidebar is toggled (will need to render both components to test this fully)
    });
  });

  describe('SettingsSidebar', () => {
    it('opens and closes based on context', async () => {
      render(
        <>
          <SettingsButton />
          <SettingsSidebar />
        </>
      );

      const button = screen.getByTestId('settings-button');
      const sidebar = screen.getByTestId('settings-sidebar');

      // Initially closed
      expect(sidebar).toHaveClass('translate-x-full');

      // Open
      await userEvent.click(button);
      expect(sidebar).not.toHaveClass('translate-x-full');

      // Close
      await userEvent.click(button);
      expect(sidebar).toHaveClass('translate-x-full');
    });

    it('closes when escape key is pressed', async () => {
      render(
        <>
          <SettingsButton />
          <SettingsSidebar />
        </>
      );

      // Open sidebar first
      const button = screen.getByTestId('settings-button');
      await userEvent.click(button);

      // Press escape
      await act(async () => {
        fireEvent.keyDown(document, { key: 'Escape' });
      });

      const sidebar = screen.getByTestId('settings-sidebar');
      expect(sidebar).toHaveClass('translate-x-full');
    });

    it('toggles settings switches correctly', async () => {
      render(<SettingsSidebar />);

      // Open sidebar first (if needed)
      const button = screen.queryByTestId('settings-button');
      if (button) {
        await userEvent.click(button);
      }

      const spotlightToggle = screen.getByLabelText('Cursor Spotlight');
      const lenisToggle = screen.getByLabelText('Lenis Scrolling (Smooth)');

      // Toggle both
      await userEvent.click(spotlightToggle);
      await userEvent.click(lenisToggle);

      // Verify visual state changes
      expect(spotlightToggle).not.toBeChecked();
      expect(lenisToggle).not.toBeChecked();
    });
  });
});