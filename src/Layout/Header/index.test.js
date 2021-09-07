import Header from './index';
import { screen } from '@testing-library/react';

describe('header', () => {
	beforeEach(() => {
		renderWithProviders(<Header />);
	});
    
	test('Renders a logo', () => {
		let logo = screen.getAllByRole('logo');
		expect(logo).toHaveLength(1);
	});

});