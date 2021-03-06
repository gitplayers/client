import Invite from './index';
import { screen } from '@testing-library/react';
import * as helperFunctions from "../../Helpers";
jest.mock("../../Helpers");
const images = {'logo.png': { default: "abc"}}
helperFunctions.images.mockResolvedValue(images);

describe('Invite Tests', () => {

	beforeEach(() => {
		renderWithProviders(<Invite />);
	});
    
	test('Renders a heading', () => {
		let heading = screen.getAllByRole('heading');
		expect(heading).toHaveLength(1);
	});

	test('Renders a stamp div', () => {
		let stamp = screen.getAllByRole('stamp');
		expect(stamp).toHaveLength(1);
	});

	test('Renders a message', () => {
		let message = screen.getAllByRole('message');
		expect(message).toHaveLength(1);
	})


});