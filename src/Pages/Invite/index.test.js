import Invite from './index';
import { screen } from '@testing-library/react';

describe('Invite Tests', () => {
	beforeEach(() => {
		renderWithProviders(<Invite />);
	});
    
	test('Renders a 2 headings', () => {
		let headings = screen.getAllByRole('heading');
		expect(headings).toHaveLength(2);
	});



});