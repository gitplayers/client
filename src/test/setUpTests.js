import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { WeddingProvider } from "../Context/WeddingContext";
import { MemoryRouter } from 'react-router-dom';

const WrapProviders = ({ children }) => {
    return (
        <MemoryRouter>
            <WeddingProvider>
                { children }
            </WeddingProvider>
        </MemoryRouter>
    )
}

const renderWithProviders = (ui, options) => render(ui, { wrapper: WrapProviders, ...options })

global.renderWithProviders = renderWithProviders

global.React = React;
global.render = render;
global.userEvent = userEvent;
global.BASE_URL = "https://gamein-vitation.herokuapp.com";