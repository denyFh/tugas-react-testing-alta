globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import React from "react";
import ReactDOM from 'react-dom/client';
import { act } from "react-dom/test-utils";
import { screen, fireEvent } from "@testing-library/react";

import NameForm from "./FormCoding";

describe('FormCoding', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    test('renders FormCoding components', () => {
        act(() => {
            ReactDOM.createRoot(container).render(<NameForm />);
        })
        // render(<NameForm />, container)

        expect(container.querySelector('h1').textContent).toBe('Pendaftaran Peserta Coding Bootcamp');

        expect(screen.getByLabelText(/Nama Lengkap/)).toBeInTheDocument();
        expect(container.querySelector('input[name=nama]')).toBeInTheDocument();

        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(container.querySelector('input[name=email]')).toBeInTheDocument();

        expect(screen.getByLabelText(/No Handphone/)).toBeInTheDocument();
        expect(container.querySelector('input[name=noHandphone]')).toBeInTheDocument();

        expect(screen.getByLabelText(/Latar Belakang Pendidikan/)).toBeInTheDocument();
        expect(container.querySelector('input[name=pendidikan]')).toBeInTheDocument();

        expect(screen.getByLabelText(/Kelas Coding yang Dipilih/)).toBeInTheDocument();
        expect(container.querySelector('select[name=kelas]')).toBeInTheDocument();

        expect(screen.getByLabelText(/Foto Surat Kesungguhan/)).toBeInTheDocument();
        expect(container.querySelector('input[type=file]')).toBeInTheDocument();

        expect(screen.getByLabelText(/Harapan Untuk Coding Bootcamp Ini/)).toBeInTheDocument();
        expect(container.querySelector('textarea[name=harapan]')).toBeInTheDocument();
    });

    test('Input all n correctly for Input elements in form', () => {
        // render(<NameForm />, container)
        act(() => {
            ReactDOM.createRoot(container).render(<NameForm />);
        })

        fireEvent.input(
            screen.getByRole("textbox", { name: /nama lengkap/i }),
            { target: { value: "Deny Firdhaus" } }
        )

        fireEvent.input(
            screen.getByRole("textbox", { name: /email/i }),
            { target: { value: "iniemail@mail.co" } }
        )

        fireEvent.input(
            screen.getByRole("spinbutton", { name: /No Handphone/i }),
            { target: { value: 1290381209 } }
        )

        fireEvent.click(
            screen.getByRole("radio", { name: /pendidikan/i }),
            { target: { value: "IT" } }
        )

        fireEvent.click(
            screen.getByRole("radio", { name: /pendidikan/i }),
            { target: { value: "Non IT" } }
        )

        fireEvent.change(
            screen.getByRole("combobox", { name: /kelas/i }),
            { target: { value: "reactjs" } }
        )

        fireEvent.change(
            screen.getByLabelText(/Foto Surat Kesungguhan/), {
            target: {
                files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })]
            },
        })

        expect(container.querySelector('input[name=nama]')).toHaveValue('Deny Firdhaus');
        expect(container.querySelector('input[name=email]')).toHaveValue('iniemail@mail.co');
        expect(container.querySelector('input[name=noHandphone]')).toHaveValue(1290381209);
        expect(container.querySelector('input[name=pendidikan]')).toBeChecked('IT');
        expect(container.querySelector('input[name=pendidikan]')).toBeChecked('Non IT');
        expect(container.querySelector('select[name=kelas]')).toHaveValue('reactjs');
        expect(container.querySelector('input[name=suratKesungguhan]').value);
    });

    test('Input to show error input for Nama Lengkap with Number', () => {
        // render(<NameForm />, container)
        act(() => {
            ReactDOM.createRoot(container).render(<NameForm />);
        })

        fireEvent.input(
            screen.getByRole("textbox", { name: /nama lengkap/i }),
            { target: { value: "Deny Firdhaus2" } }
        )

        expect(screen.getByLabelText(/Nama Lengkap/)).toHaveValue("Deny Firdhaus2");
        expect(screen.getByText("Nama Lengkap Harus Berupa Huruf")).toBeInTheDocument();
    });

    test('Input to show error input for Email with wrong format', () => {
        // render(<NameForm />, container)
        act(() => {
            ReactDOM.createRoot(container).render(<NameForm />);
        })

        fireEvent.input(
            screen.getByRole("textbox", { name: /email/i }),
            { target: { value: "iniemail.co" } }
        )

        expect(screen.getByLabelText(/Email/)).toHaveValue("iniemail.co");
        expect(screen.getByText("Email Tidak Sesuai")).toBeInTheDocument();
    });

    test('Input to show error input for phone number under baselimit', () => {
        // render(<NameForm />, container)
        act(() => {
            ReactDOM.createRoot(container).render(<NameForm />);
        })

        fireEvent.input(
            screen.getByRole("spinbutton", { name: /No Handphone/i }),
            { target: { value: 12345 } }
        )

        expect(screen.getByLabelText(/No Handphone/)).toHaveValue(12345);
        expect(screen.getByText("No Handphone Tidak Sesuai")).toBeInTheDocument();
    });

    test('Submit button', () => {
        const jsdomAlert = window.alert;
        window.alert = () => { };
        // render(<NameForm />, container)
        act(() => {
            ReactDOM.createRoot(container).render(<NameForm />);
        })
        fireEvent.input(
            screen.getByRole("textbox", { name: /nama lengkap/i }),
            { target: { value: "Deny Firdhaus" } }
        )

        fireEvent.input(
            screen.getByRole("textbox", { name: /email/i }),
            { target: { value: "iniemail@mail.co" } }
        )

        fireEvent.input(
            screen.getByRole("spinbutton", { name: /No Handphone/i }),
            { target: { value: 1290381209 } }
        )

        fireEvent.click(
            screen.getByRole("radio", { name: /pendidikan/i }),
            { target: { value: "IT" } }
        )

        fireEvent.click(
            screen.getByRole("radio", { name: /pendidikan/i }),
            { target: { value: "Non IT" } }
        )

        fireEvent.change(
            screen.getByRole("combobox", { name: /kelas/i }),
            { target: { value: "reactjs" } }
        )

        fireEvent.change(
            screen.getByLabelText(/Foto Surat Kesungguhan/), {
            target: {
                files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })]
            },
        })

        fireEvent.click(
            screen.getByText('Submit')
        )

        window.alert = jsdomAlert;

        expect(container.querySelector('input[name=nama]')).toHaveValue('');
        expect(container.querySelector('input[name=email]')).toHaveValue('');
        expect(container.querySelector('input[name=noHandphone]')).toHaveValue(null);
        expect(container.querySelector('input[name=pendidikan]')).not.toBeChecked();
        expect(container.querySelector('input[name=pendidikan]')).not.toBeChecked('');
        expect(container.querySelector('select[name=kelas]')).toHaveValue('');
        expect(container.querySelector('input[name=suratKesungguhan]').value).toBeNull;
    });
})