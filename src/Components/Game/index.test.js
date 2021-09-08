import Game from './index';
import { screen } from '@testing-library/react';
import * as wedding from "../../Context/WeddingContext";
jest.mock("../../Context/WeddingContext")
const weddingData = {side1: {id: 1, character: {name: "abc", hair_id: 1, skin_id: 1, dress_id: 1, eyes_id: 1}}, side2: {id: 2, character: {name: "abc", hair_id: 1, skin_id: 1, dress_id: 1, eyes_id: 1}}}
wedding.weddingData.mockResolvedValue(weddingData);

describe('Game Component Tests', () => {
	beforeEach(() => {
		renderWithProviders(<Game />);
	});
    
	test('canvas renders', () => {
		let canvas = screen.getAllByRole('canvas');
		expect(canvas).toHaveLength(1);
	});

	// test('modal renders, but as display none', () => {
	// 	let modal = screen.getAllByRole('modal');
	// 	expect(modal).toHaveLength(1);
	// })

});