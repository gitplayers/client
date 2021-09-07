import NotFound from './index';
import { screen } from '@testing-library/react';

describe('Invite Tests', () => {
	beforeEach(() => {
		renderWithProviders(<NotFound />);
	});
    
	test('Renders a headings', () => {
		let heading = screen.getAllByRole('heading');
		expect(heading).toHaveLength(1);
	});



});