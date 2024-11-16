import React from 'react';
import AddOrEditModal from '../AddOrEdit';
import { PersonDto } from 'interfaces/dto/persons/PersonDto';
import { useDispatch } from 'hooks';
import { createPerson, updatePerson } from 'store/persons';
import { Paper, PaperProps } from '@material-ui/core';
import Draggable from 'react-draggable';

const initialState: PersonDto = {
  id: 0,
  firstName: '',
  lastName: '',
  age: 0,
};

const buildRequest = (state: any): PersonDto => {
  return {
    id: state.id,
    firstName: state.firstName,
    lastName: state.lastName,
    age: state.age,
  };
};

const fields = [
  { name: 'firstName', label: 'First Name', type: 'text' as const },
  { name: 'lastName', label: 'Last Name', type: 'text' as const },
  { name: 'age', label: 'Age', type: 'number' as const },
];

interface Props {
  item?: PersonDto;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DraggablePaper = (props: PaperProps) => {
  return (
    <Draggable handle="#add-or-edit-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

const PersonModal: React.FC<Props> = ({ item, isOpen, setOpen }) => {
  const dispatch = useDispatch();

  const handleSave = (person: PersonDto) => {
    if (person.id) {
      dispatch(updatePerson({ id: person.id, data: person }));
    } else {
      dispatch(createPerson(person));
    }
  };

  return (
    <AddOrEditModal
      item={item}
      isOpen={isOpen}
      setOpen={setOpen}
      onSave={handleSave}
      buildRequest={buildRequest}
      initialState={initialState}
      fields={fields}
      PaperComponent={DraggablePaper}
    />
  );
};

export default PersonModal;