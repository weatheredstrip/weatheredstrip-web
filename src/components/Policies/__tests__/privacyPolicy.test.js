import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { PrivacyPolicyDialog, PrivacyPolicyDialogLink } from "../privacyPolicy";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the full dialog text", () => {
  act(() => {
    render(<PrivacyPolicyDialog isShown={true} />, container);
  });

  const dialog = document.querySelector("[role=dialog]");

  expect(dialog.textContent).toMatchSnapshot();
});

it("renders the link for the dialog", () => {
  act(() => {
    render(<PrivacyPolicyDialogLink />, container);
  });
  expect(container).toMatchSnapshot();
})

it("opens the dialog when clicked", () => {
  act(() => {
    render(<PrivacyPolicyDialogLink />, container);
  });

  let dialog = document.querySelector("[role=dialog]");
  expect(dialog).toBeNull();

  // Get a hold of the Link
  const button = document.querySelector("[data-testid=privButton]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  dialog = document.querySelector("[role=dialog]");
  expect(dialog).not.toBeNull();
})
