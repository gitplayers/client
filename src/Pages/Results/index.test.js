import Results from './index';
import { screen} from '@testing-library/react';

describe('Results Page Tests', () => {
	beforeEach(() => {
		renderWithProviders(<Results />);
	});
    
	test('Renders a table', () => {
		let table = screen.getAllByRole('table');
		expect(table).toHaveLength(1);
	});

    test('See invite button renders', () => {
        let button = screen.getAllByRole('button');
        expect(button).toHaveLength(1);
    })

});