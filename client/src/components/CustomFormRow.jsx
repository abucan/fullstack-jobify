import Wrapper from '../assets/wrappers/FormRow';

export const CustomFormRow = () => {
  return (
    <Wrapper className='input-group'>
      <input type='text' />
      <label>Enter Password</label>
    </Wrapper>
  );
};

export default CustomFormRow;
