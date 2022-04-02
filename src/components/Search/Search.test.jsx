globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from "react";
import axios from "axios";
import ReactDOM from 'react-dom/client';
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";

import Search from "./Search";

jest.mock('axios');

describe('Search', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    test('fetches story from an API and displays them', async () => {
        const stories = [
            { objectID: '1', title: 'React' },
            { objectID: '2', title: 'Hello' },
        ];

        axios.get.mockImplementationOnce(() => {
            return Promise.resolve({ data: { hits: stories } })
        });

        act(() => {
            ReactDOM.createRoot(container).render(<Search />);
        })

        await act(async () => {
            userEvent.click(screen.getByRole('button'));
        })
        const items = await screen.findAllByRole('listitem');
        expect(items).toHaveLength(2)
    });

    test('fetches story from an API and fails', async () => {
        axios.get.mockImplementationOnce(() => {
            return Promise.reject(new Error())
        });

        act(() => {
            ReactDOM.createRoot(container).render(<Search />);
        })

        await act(async () => {
            userEvent.click(screen.getByRole('button'));
        });

        const items = await screen.findByText("Ada yang error ...")

        expect(items).toBeInTheDocument();
    })
})