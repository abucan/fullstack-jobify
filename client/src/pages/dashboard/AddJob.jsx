import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    isLoading,
    createJob,
    editJob,
  } = useAppContext();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  return (
    <Wrapper>
      <h3>{isEditing ? 'edit job' : 'add job'}</h3>
      {showAlert && <Alert />}
      <div className='form-center'>
        <FormRow
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
          labelText='Position'
        />
        <FormRow
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}
          labelText='Company'
        />
        <FormRow
          type='text'
          name='jobLocation'
          value={jobLocation}
          handleChange={handleJobInput}
          labelText='Job Location'
        />
        {/* job status */}
        <FormRowSelect
          name='status'
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
        />
        {/* job type */}
        <FormRowSelect
          name='jobType'
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
          labelText='Job Type'
        />
        <div className='btn-container'>
          <button
            type='submit'
            className='btn btn-block submit-btn'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            submit
          </button>
          <button
            type='submit'
            className='btn btn-block clear-btn'
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            clear
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddJob;
