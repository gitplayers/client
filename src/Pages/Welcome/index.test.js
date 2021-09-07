import Welcome from './index';
import { screen} from '@testing-library/react';

describe('header', () => {
	beforeEach(() => {
		renderWithProviders(<Welcome />);
	});
    
	test('h1 renders', () => {
		let canvas = screen.getAllByRole('h1');
		expect(canvas).toHaveLength(1);
	});

});