import Home from './index';
import { screen } from '@testing-library/react';

describe('Invite Tests', () => {
	beforeEach(() => {
		renderWithProviders(<Home />);
	});
    
	test('Renders 10 headings', () => {
		let headings = screen.getAllByRole('heading');
		expect(headings).toHaveLength(10);
	});



});