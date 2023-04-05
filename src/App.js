import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Modal from "./Modal";

/*

Interview Task:

Create a WCAG 2.1 AA Compliant Modal

Put any content you want in the modal,
ensure it is dismissable or closable,
include comments to help us understand
your choices, the modal must prevent 
interaction with the underlying page
until dismissed or actioned

Write some tests to confirm that the
modal works and is compliant

Create some styles, remember any styles
should also be WCAG 2.1 AA Compliant

NB: Getting the task done is more important than
it being complete, don't worry about implementing 
the solution in a single file

Use comments to explain missing parts of the 
implementation or to explain where you stopped
and why - the more comments you leave us the
easier it will be for use to understand how you
write code :)

Feel free to add libraries on the left,
the test runner is in a tab on the right

*/

export default function App() {
  // state to handle modal rendering
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      // remove focus from the button
      buttonRef.current.blur();
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // return focus to the button
    buttonRef.current.focus();
  };

  const modalText =
    "This is a dummy form. You cannot interact with anything outside of the modal until its closed.";

  return (
    <div className="site">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Arnold Low - NewDay Tech Test </title>
      </head>
      <a
        href="#main-content"
        className="skip-link"
        tabIndex={isModalOpen ? "-1" : ""} // prevent user from tabbing onto the anchor when the modal is open, otherwise can be tabbed onto
        aria-label="skip to main content: modal"
        aria-disabled="false"
        data-testid="test-root-a-id"
      >
        Skip to modal
      </a>
      <header aria-label="header">
        <h1
          id="main-content"
          aria-label="tech test company"
          aria-level="1"
          data-testid="test-root-h1-id"
        >
          NewDay
        </h1>
      </header>
      <main
        aria-label="main content of the page"
        aria-haspopup="dialog"
        data-testid="test-root-main-id"
      >
        <h2
          id="main-content"
          aria-label="tech test requirement"
          aria-level="2"
          data-testid="test-root-h2-id"
        >
          Let’s see a modal
        </h2>
        <button
          ref={buttonRef}
          className="site-button"
          type="button"
          onClick={openModal}
          tabIndex={isModalOpen ? "-1" : ""} // prevent user from tabbing onto the button when the modal is open, otherwise can be tabbed onto
          aria-label="button to open modal"
          aria-disabled="false"
          aria-controls="modal-container"
          data-testid="test-root-buttonopen-id"
        >
          Open Modal
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          autoFocus={true}
          label="WCAG 2.1 AA Modal"
          description="Description of the modal"
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* use elements below as children for modal component. this is not necessary in this context, however I wanted to demostrate react knowledge */}
          <h2
            id="modal-title"
            aria-label="note"
            aria-level="2"
            data-testid="test-root-h2-id"
          >
            Note:
          </h2>
          <p
            id="modal-description"
            aria-label="short description"
            data-testid="test-root-p-id"
          >
            {modalText}
          </p>
        </Modal>
      </main>
    </div>
  );
}