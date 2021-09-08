import Header from './index';
import { screen } from '@testing-library/react';
import * as helperFunctions from "../../Helpers";
jest.mock("../../Helpers");
const images = {'logo.png': { default: "abc"}}
helperFunctions.images.mockResolvedValue(images);
describe('header', () => {
	
	beforeEach(() => {
		renderWithProviders(<Header />);
	});
    
	test('Renders a logo', () => {
		let logo = screen.getAllByRole('logo');
		expect(logo).toHaveLength(1);
	});

});