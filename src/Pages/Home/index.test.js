import Home from './index';
import { screen } from '@testing-library/react';
import * as helperFunctions from "../../Helpers";
jest.mock("../../Helpers");
const images = {'logo.png': { default: "abc"}}
helperFunctions.images.mockResolvedValue(images);

describe('Home Tests', () => {
	beforeEach(() => {
		renderWithProviders(<Home />);
	});
    
	test('Renders 10 headings', () => {
		let headings = screen.getAllByRole('heading');
		expect(headings).toHaveLength(10);
	});

});