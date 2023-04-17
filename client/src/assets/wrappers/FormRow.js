import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  input {
    width: 100%;
    border: solid 1.5px #9e9e9e;
    border-radius: 1rem;
    background: none;
    padding: 1rem;
    font-size: 1rem;
    color: #000;
    font-weight: bold;
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
      outline: none;
      border: 1.5px solid #1a73e8;
    }
  }

  label {
    position: absolute;
    left: 16px;
    top: -4px;
    color: #e8e8e8;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  input:focus ~ label {
    transform: translateY(-45%) scale(0.8);
    background-color: #ffffff;
    padding: 0 0.2em;
    color: #2196f3;
  }
`;

export default Wrapper;
