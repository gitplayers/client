import Invite from './index';
import { screen } from '@testing-library/react';

describe('Invite Tests', () => {
	beforeEach(() => {
		renderWithProviders(<Invite />);
	});
    
	test('Renders a heading', () => {
		let heading = screen.getAllByRole('heading');
		expect(heading).toHaveLength(1);
	});



});