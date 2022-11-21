import { render, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import FollowedProfiles from './components/FollowedProfiles';

afterEach(() => {
  cleanup();
});

describe('Button Component', () => {
  render(<FollowedProfiles />);
  const image = screen.getByAltText('Followed Profile');

  // Test 1
  test('Image Rendering', () => {
    expect(image).toBeInTheDocument();
  });

  // Test 2
  test('Image Class', () => {
    expect(image).toHaveClass('userImage');
  });
});
