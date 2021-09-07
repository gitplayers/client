import Welcome from './index';
import { screen} from '@testing-library/react';

describe('header', () => {
	beforeEach(() => {
		renderWithProviders(<Welcome />);
	});
    
	test('h1 renders', () => {
		let headings = screen.getAllByRole('heading');
		expect(headings).toHaveLength(3);
	});

});