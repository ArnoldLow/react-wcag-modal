import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import React from "react";
import App from './App';
import Modal from './Modal';

describe('Colour Contrast', () => {
  
  function getContrastRatio(background, foreground) {
    const luminance1 = getLuminance(background);
    const luminance2 = getLuminance(foreground);
    const lightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    return (lightest + 0.05) / (darkest + 0.05);
  }
  
  function getLuminance(color) {
    const rgb = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    const r = parseInt(rgb[1], 16) / 255; // 16 uses hexademical
    const g = parseInt(rgb[2], 16) / 255;
    const b = parseInt(rgb[3], 16) / 255;
    const srgb = [r, g, b].map((v) => {
      if (v <= 0.03928) {
        return v / 12.92;
      }
      return ((v + 0.055) / 1.055) ** 2.4;
    });
    const l = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    return l;
  }
  
  test('modal text and modal background colors have sufficient contrast', () => {
    const text = '#000000'; // black
    const background = '#ffebcd'; // blanched almond
  
    const contrastRatio = getContrastRatio(background, text);
    expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
  });
  
})

describe('Screen Reader', () => {
    test('should be accessible to screen readers', () => {
      const { container } = render(<Modal isOpen={true} description="Test Modal description" label="type out your name"/>);
      const description="Test Modal description"
      const label="type out your name"
      const modal = container.querySelector('.modal-container');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-describedby', description);
      
      const modalContent = container.querySelector('.modal-content');
      expect(modalContent).toHaveAttribute('role', 'dialog');
      expect(modalContent).toHaveAttribute('aria-modal', 'true');
      expect(modalContent).toHaveAttribute('aria-label', label);
      expect(modalContent).toHaveAttribute('aria-describedby', description);
      expect(modalContent).toHaveAttribute('tabIndex', '-1');
      
      const modalHeader = container.querySelector('.modal-header');
      expect(modalHeader).toBeInTheDocument();
      expect(modalHeader.querySelector('h1')).toHaveAttribute('id', label);
      expect(modalHeader.querySelector('h1')).toHaveAttribute('aria-label', 'WCAG 2.1 AA Modal');
      expect(modalHeader.querySelector('h1')).toHaveAttribute('aria-level', '1');
      
      const modalBody = container.querySelector('.modal-body');
      expect(modalBody).toBeInTheDocument();
      
      const modalForm = container.querySelector('.modal-form');
      expect(modalForm).toBeInTheDocument();
      expect(modalForm).toHaveAttribute('aria-label', 'dummy form');
      
      const nameLabel = container.querySelector('[data-testid="test-label-name-id"]');
      expect(nameLabel).toHaveAttribute('for', 'input-name-id');
      expect(nameLabel).toHaveAttribute('aria-label', 'input field label: your name');
      
      const nameInput = container.querySelector('[data-testid="test-input-name-id"]');
      expect(nameInput).toHaveAttribute('type', 'text');
      expect(nameInput).toHaveAttribute('id', 'input-name-id');
      expect(nameInput).toHaveAttribute('name', 'input-name');
      expect(nameInput).toHaveAttribute('aria-label', 'Enter your name');
      expect(nameInput).toHaveAttribute('aria-required', 'false');
      expect(nameInput).toHaveAttribute('placeholder', 'Type your name');
      
      const subjectLabel = container.querySelector('[data-testid="test-label-subject-id"]');
      expect(subjectLabel).toHaveAttribute('for', 'input-subject-id');
      expect(subjectLabel).toHaveAttribute('aria-label', 'input field label: subject');
      
      const subjectInput = container.querySelector('[data-testid="test-input-subject-id"]');
      expect(subjectInput).toHaveAttribute('type', 'text');
      expect(subjectInput).toHaveAttribute('id', 'input-subject-id');
      expect(subjectInput).toHaveAttribute('name', 'input-subject');
      expect(subjectInput).toHaveAttribute('aria-label', 'Enter subject');
      expect(subjectInput).toHaveAttribute('aria-required', 'false');
      expect(subjectInput).toHaveAttribute('placeholder', 'i.e. Address change');
      
      const phoneLabel = container.querySelector('[data-testid="test-label-phone-id"]');
      expect(phoneLabel).toHaveAttribute('for', 'input-phone-id');
      expect(phoneLabel).toHaveAttribute('aria-label', 'input field label: your phone number');
      
      const phoneInput = container.querySelector('[data-testid="test-input-phone-id"]');
      expect(phoneInput).toHaveAttribute('type', 'text');
      expect(phoneInput).toHaveAttribute('id', 'input-phone-id');
      expect(phoneInput).toHaveAttribute('name', 'input-phone');
      expect(phoneInput).toHaveAttribute('aria-label', 'Enter your number');
      expect(phoneInput).toHaveAttribute('aria-required', 'false');
      expect(phoneInput).toHaveAttribute('placeholder', 'Type your number');

      const closeButton = container.querySelector('[data-testid="test-button-close-id"]');
      expect(closeButton).toHaveAttribute('type', 'button');
      expect(closeButton).toHaveAttribute('id', 'close-button-id');
      expect(closeButton).toHaveAttribute('name', 'close-button');
      expect(closeButton).toHaveAttribute('aria-label', 'button to close modal');
      expect(closeButton).toHaveAttribute('aria-disabled', 'false');
      expect(closeButton).toHaveAttribute('tabIndex', '0');

      expect(nameInput).toHaveFocus();
      userEvent.tab();
      expect(subjectInput).toHaveFocus();
      userEvent.tab();
      expect(phoneInput).toHaveFocus();
      userEvent.tab();
      expect(closeButton).toHaveFocus();
    })
})

describe('Modal Aria Attributes', () => {
  const onClose = jest.fn();
  const label = 'Test Modal';
  const description = 'Test Description.'
  const modal = render(<Modal isOpen={true} onClose={onClose} label={label} description={description}>
      <h2 data-testid="test-root-h2-id" aria-label="note">test header 2</h2>
      <p data-testid="test-root-p-id" aria-label="short description">test paragraph</p>
    </Modal>);
  const modalContent = modal.getByRole('dialog');
  const header = modal.getByTestId('test-modal-h1-id');
  const subHeader = modal.getByTestId('test-root-h2-id');
  const paragraph = modal.getByTestId('test-root-p-id');
  const nameLabel = modal.getByTestId('test-label-name-id');
  const nameInput = modal.getByTestId('test-input-name-id');
  const subjectLabel = modal.getByTestId('test-label-subject-id');
  const subjectInput = modal.getByTestId('test-input-subject-id');
  const phoneLabel = modal.getByTestId('test-label-phone-id');
  const phoneInput = modal.getByTestId('test-input-phone-id');
  const buttonClose = modal.getByTestId('test-button-close-id');
  it('modal content should have correct accessibility attributes)', () => {
    expect(modalContent).toHaveAttribute('role', 'dialog');
    expect(modalContent).toHaveAttribute('aria-modal', 'true');
    expect(modalContent).toHaveAttribute('aria-label', label);
    expect(modalContent).toHaveAttribute('aria-describedby', description);
  });
  it('modal header should have correct accessibility attributes)', () => {
    expect(header).toHaveAttribute('aria-label', 'WCAG 2.1 AA Modal');
    expect(subHeader).toHaveAttribute('aria-label', 'note');
  });
  it('modal paragraph should have correct accessibility attributes)', () => {
    expect(paragraph).toHaveAttribute('aria-label', 'short description');
  });
  it('form labels should have correct accessibility attributes', () => {
    expect(nameLabel).toHaveAttribute('aria-label', 'input field label: your name');
    expect(nameLabel).toHaveAttribute('for', 'input-name-id'); // react attribute for html "for" is 'htmlFor'

    expect(subjectLabel).toHaveAttribute('aria-label', 'input field label: subject');
    expect(subjectLabel).toHaveAttribute('for', 'input-subject-id');

    expect(phoneLabel).toHaveAttribute('aria-label', 'input field label: your phone number');
    expect(phoneLabel).toHaveAttribute('for', 'input-phone-id');
  });
  it('form inputs should have correct accessibility attributes', () => {
    expect(nameInput).toHaveAttribute('name', 'input-name');
    expect(nameInput).toHaveAttribute('label', 'type out your name');
    expect(nameInput).toHaveAttribute('aria-label', 'Enter your name');
    expect(nameInput).toHaveAttribute('placeholder', 'Type your name');
    expect(nameInput).toHaveAttribute('aria-required', 'false');

    expect(subjectInput).toHaveAttribute('name', 'input-subject');
    expect(subjectInput).toHaveAttribute('label', 'type out the subject');
    expect(subjectInput).toHaveAttribute('aria-label', 'Enter subject');
    expect(subjectInput).toHaveAttribute('placeholder', 'i.e. Address change');
    expect(subjectInput).toHaveAttribute('aria-required', 'false');

    expect(phoneInput).toHaveAttribute('name', 'input-phone');
    expect(phoneInput).toHaveAttribute('label', 'type out your number');
    expect(phoneInput).toHaveAttribute('aria-label', 'Enter your number');
    expect(phoneInput).toHaveAttribute('placeholder', 'Type your number');
    expect(phoneInput).toHaveAttribute('aria-required', 'false');
  });
  it('modal button should have correct accessibility attributes', () => {
    expect(buttonClose).toHaveAttribute('label', 'close modal button');
    expect(buttonClose).toHaveAttribute('type', 'button');
    expect(buttonClose).toHaveAttribute('aria-label', 'button to close modal');
    expect(buttonClose).toHaveAttribute('aria-disabled', 'false');
  })
})

describe('Modal Conditional Rendering', () => {
  test('should not render when isOpen is false', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Modal
        onClose={handleClose}
        label="Test Modal"
        description="A test modal"
        isOpen={false}
      >
        <p>Test modal content</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  test('should fully render when isOpen is true', () => {
    const handleClose = jest.fn();
    const modal = render(
      <Modal isOpen={true} onClose={handleClose}> 
        <h2 data-testid="test-root-h2-id">test header 2</h2>
        <p data-testid="test-root-p-id">test paragraph</p>
      </Modal>);

    const header = modal.getByTestId('test-modal-h1-id');
    const subHeader = modal.getByTestId('test-root-h2-id');
    const paragraph = modal.getByTestId('test-root-p-id');
    const form = modal.getByTestId('test-modal-form-id');
    const labelName = modal.getByTestId('test-label-name-id');
    const inputName = modal.getByTestId('test-input-name-id');
    const labelSubject = modal.getByTestId('test-label-subject-id');
    const inputSubject = modal.getByTestId('test-input-subject-id');
    const labelPhone = modal.getByTestId('test-label-phone-id');
    const inputPhone = modal.getByTestId('test-input-phone-id');
    const buttonClose = modal.getByTestId('test-button-close-id');
    expect(header).toBeInTheDocument();
    expect(subHeader).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(labelName).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(labelSubject).toBeInTheDocument();
    expect(inputSubject).toBeInTheDocument();
    expect(labelPhone).toBeInTheDocument();
    expect(inputPhone).toBeInTheDocument();
    expect(buttonClose).toBeInTheDocument();
  });
})

describe('Focus Management', () => {
  it('should have to ability to focus on all inputs and button', () => {
    const onClose = jest.fn();
    const modal = render(<Modal isOpen={true} onClose={onClose} />);

    const inputName = modal.getByTestId('test-input-name-id');
    const inputSubject = modal.getByTestId('test-input-subject-id');
    const inputPhone = modal.getByTestId('test-input-phone-id');
    const buttonClose = modal.getByTestId('test-button-close-id');

    inputName.focus();
    expect(document.activeElement).toBe(inputName);

    inputSubject.focus();
    expect(document.activeElement).toBe(inputSubject);

    inputPhone.focus();
    expect(document.activeElement).toBe(inputPhone);

    buttonClose.focus();
    expect(document.activeElement).toBe(buttonClose);

  });
  it('should initially focus on the name input field when modal is opened', () => {
    const { container } = render(<Modal isOpen={true}/>);
    const nameInput = container.querySelector('[data-testid="test-input-name-id"]');
    expect(nameInput).toHaveFocus();
  });
  it('should set focus back to the open modal button when closed', async () => {
    const { getByLabelText, container } = render(<App />);

    // open modal
    const openModalButton = getByLabelText("button to open modal");
    fireEvent.click(openModalButton);

    // close modal
    const closeButton = getByLabelText("button to close modal");
    closeButton.focus();
    userEvent.keyboard('{enter}')

    expect(openModalButton).toHaveFocus();
  });
})

describe('Keyboard Accessibility', () => {

  it('should close the modal when Escape is pressed', () => {
    const onClose = jest.fn();
    const modal = render(<Modal isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(modal.container, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it("should close the modal when Enter is pressed while the close button is focused", async () => {
    const onClose = jest.fn();
    const { container } = render(<Modal isOpen={true} onClose={onClose}/>);
    const closeButton = container.querySelector('[data-testid="test-button-close-id"]');
    closeButton.focus();
    userEvent.keyboard('{enter}')
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when Space is pressed while the button is focused', () => {
    const onClose = jest.fn();
    const { container } = render(<Modal isOpen={true} onClose={onClose}/>);
    const closeButton = container.querySelector('[data-testid="test-button-close-id"]');
    closeButton.focus();
    userEvent.keyboard('{space}')
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test("is navigable via tabbing", () => {
    const { container } = render(<Modal isOpen={true}/>);
    
    const nameInput = container.querySelector('[data-testid="test-input-name-id"]');
    const subjectInput = container.querySelector('[data-testid="test-input-subject-id"]')      
    const phoneInput = container.querySelector('[data-testid="test-input-phone-id"]');
    const closeButton = container.querySelector('[data-testid="test-button-close-id"]');
      
    expect(nameInput).toHaveFocus();
    userEvent.tab();
    expect(subjectInput).toHaveFocus();
    userEvent.tab();
    expect(phoneInput).toHaveFocus();
    userEvent.tab();
    expect(closeButton).toHaveFocus();
    userEvent.tab(); // this focus on the browser url bar
    userEvent.tab(); // moves focus back to modal
    expect(nameInput).toHaveFocus();
  });
  test("is navigable via reverse tabbing", () => {
    const { container } = render(<Modal isOpen={true}/>);
    
    const nameInput = container.querySelector('[data-testid="test-input-name-id"]');
    const subjectInput = container.querySelector('[data-testid="test-input-subject-id"]')      
    const phoneInput = container.querySelector('[data-testid="test-input-phone-id"]');
    const closeButton = container.querySelector('[data-testid="test-button-close-id"]');
      
    expect(nameInput).toHaveFocus();
    userEvent.tab({ shift: true }); // this focus on the browser url bar
    userEvent.tab({ shift: true }); // moves focus back to modal
    expect(closeButton).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(phoneInput).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(subjectInput).toHaveFocus();
    userEvent.tab({ shift: true });
    expect(nameInput).toHaveFocus();
  })
})
