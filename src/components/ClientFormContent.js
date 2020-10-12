import {
  Select,
  Stack,
  Button,
  Input,
  Heading,
  FormLabel,
} from '@chakra-ui/core';
import DatePicker from 'react-datepicker';

const ClientFormContent = ({ onSubmit, buttonText, inputStates }) => {
  const handleChangeFname = (e) => {
    inputStates.setFname(e.target.value);
  };
  const handleChangeLname = (e) => {
    inputStates.setLname(e.target.value);
  };
  const handleChangeProperty = (e) => {
    inputStates.setProperty(e.target.value);
  };
  const handleChangeEmail = (e) => {
    inputStates.setEmail(e.target.value);
  };
  const handleChangeTasks = (e) => {
    let currentTasks = inputStates.tasks;
    let i = currentTasks.findIndex((task) => task.name === e.target.name);
    if (i !== -1) {
      currentTasks[i] = {
        label: e.target.id,
        name: e.target.name,
        status: e.target.value,
      };
      inputStates.setTasks(currentTasks);
    }
  };

  const inputs = [
    {
      label: 'First Name',
      name: 'fname',
      value: inputStates.fname,
      onChange: handleChangeFname,
    },
    {
      label: 'Last Name',
      name: 'lname',
      value: inputStates.lname,
      onChange: handleChangeLname,
    },
    {
      label: 'Email',
      name: 'email',
      value: inputStates.email,
      onChange: handleChangeEmail,
    },
    {
      label: 'Property',
      name: 'property',
      value: inputStates.property,
      onChange: handleChangeProperty,
    },
  ];

  const options = [
    { text: 'Not Started Yet', value: 'NSY' },
    { text: 'In Progress', value: 'IP' },
    { text: 'Completed', value: 'C' },
    { text: 'Does Not Apply', value: 'NA' },
  ];

  const dropdowns = [
    { label: 'Preapproval Process', name: 'task1' },
    { label: 'Home Searching/Showings', name: 'task2' },
    { label: 'Submit an Offer', name: 'task3' },
    { label: 'Contract Ratification', name: 'task4' },
    { label: 'Schedule Closing', name: 'task5' },
    { label: 'Schedule Final Walkthrough', name: 'task6' },
    { label: 'Attend Closing', name: 'task7' },
    { label: "You're a home owner!", name: 'task8' },
    { label: 'Submit a Review', name: 'task9' },
  ];

  return (
    <Stack mt='2em' spacing={4}>
      <Heading fontSize='3xl'> Personal Information </Heading>
      {inputs.map((input) => (
        <>
          <FormLabel mb={1}> {input.label} </FormLabel>
          <Input
            mb='1em'
            value={input.value}
            name={input.name}
            onChange={input.onChange}
          />
        </>
      ))}
      <Heading fontSize='3xl'> Status Information</Heading>
      {dropdowns.map((dropdown, i) => (
        <>
          <FormLabel mb={1}> {dropdown.label} </FormLabel>
          <Select
            mb='1em'
            name={dropdown.name}
            onChange={handleChangeTasks}
            id={dropdown.label}
          >
            {options.map((option) => (
              <option
                selected={inputStates.tasks[i].status === option.value}
                value={option.value}
              >
                {option.text}
              </option>
            ))}
          </Select>
          {/* <DatePicker selected={null} onChange={() => {}} /> */}
        </>
      ))}
      <Button my='1em' onClick={onSubmit}>
        {buttonText}
      </Button>
    </Stack>
  );
};

export default ClientFormContent;
