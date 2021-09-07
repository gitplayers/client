import Welcome from './index';
import { screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
describe('Welcome Page Tests', () => {
    const history = createMemoryHistory();
	beforeEach(() => {
		renderWithProviders(
            <Router history={history}>
                <Welcome />
            </Router>
        );
	});
    
	test('headings render', () => {
		let headings = screen.getAllByRole('heading');
		expect(headings).toHaveLength(3);
	});

    test('3 buttons render', () => {
        let buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(3);
    })

    test('clicking any of the 3 buttons advances page', () => {
        let buttons = screen.getAllByRole('button');
        userEvent.click(buttons[0]);
        userEvent.click(buttons[1]);
        userEvent.click(buttons[2]);
        expect(history.length).toBe(4);
    })

});