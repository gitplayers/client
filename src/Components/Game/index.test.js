import Game from './index';
import { screen } from '@testing-library/react';

describe('Game Component Tests', () => {
	beforeEach(() => {
		renderWithProviders(<Game />);
	});
    
	test('canvas renders', () => {
		let canvas = screen.getAllByRole('canvas');
		expect(canvas).toHaveLength(1);
	});

});