import React, { useEffect, useRef } from "react";
import "./App.css";

function Modal({ onClose, label, description, children, isOpen }) {
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // hide content outside of modal
      modalRef.current.focus(); // set focus to the modal
      firstFocusableRef.current.focus(); // set focus to the first form field
    } else {
      document.body.style.overflow = "auto"; // add scroll bars when necessary
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        // allow users to close modal via escape key
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown); // listen for keyboard interactions
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown); // event listener clean up
    };
  }, [isOpen, onClose]);

  // returns nothing if modal state is not open
  if (!isOpen) {
    return null;
  }

  // returns a render dummy form modal
  return (
    <div
      className="modal-container"
      id="modal=container"
      aria-modal="true"
      aria-describedby={description}
    >
      <div className="modal-box">
        <div
          ref={modalRef}
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          aria-describedby={description}
          tabIndex="-1"
          data-testid="test-modal-content-id"
        >
          <div className="modal-header">
            <h1
              id={label}
              aria-label="WCAG 2.1 AA Modal"
              aria-level="1"
              data-testid="test-modal-h1-id"
            >
              {label}
            </h1>
          </div>
          <div className="modal-body">{children}</div>
          <form
            className="modal-form"
            aria-label="dummy form"
            data-testid="test-modal-form-id"
          >
            <label
              className="input-label"
              htmlFor="input-name-id"
              aria-label="input field label: your name"
              data-testid="test-label-name-id"
            >
              Name:
            </label>
            <input
              ref={firstFocusableRef}
              className="input-field"
              type="text"
              id="input-name-id"
              data-testid="test-input-name-id"
              name="input-name"
              label="type out your name"
              aria-label="Enter your name"
              aria-required="false" // as this is a dummy form with no validation it is not required
              placeholder="Type your name"
            />
            <label
              className="input-label"
              htmlFor="input-subject-id"
              aria-label="input field label: subject"
              data-testid="test-label-subject-id"
            >
              Subject:
            </label>
            <input
              className="input-field"
              type="text"
              id="input-subject-id"
              data-testid="test-input-subject-id"
              name="input-subject"
              label="type out the subject"
              aria-label="Enter subject"
              aria-required="false" // as this is a dummy form with no validation it is not required
              placeholder="i.e. Address change"
            />
            <label
              className="input-label"
              htmlFor="input-phone-id"
              aria-label="input field label: your phone number"
              data-testid="test-label-phone-id"
            >
              Phone Number:
            </label>
            <input
              ref={lastFocusableRef}
              className="input-field"
              type="text"
              id="input-phone-id"
              data-testid="test-input-phone-id"
              name="input-phone"
              label="type out your number"
              aria-label="Enter your number"
              aria-required="false"
              placeholder="Type your number"
            />
          </form>
          <div className="modal-footer">
            <button
              className="modal-button"
              label="close modal button"
              type="button"
              aria-label="button to close modal"
              aria-disabled="false"
              id="close-button-id"
              data-testid="test-button-close-id"
              name="close-button"
              onClick={onClose}
              ref={closeButtonRef}
              tabIndex="0"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;