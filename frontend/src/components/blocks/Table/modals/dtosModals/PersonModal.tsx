import React, { useEffect, useState } from 'react';
import AddOrEditModal from '../AddOrEdit';
import { PersonDto } from 'interfaces/dto/people/PersonDto';
import { useDispatch } from 'hooks';
import { createPerson, updatePerson } from 'store/people';
import { Paper, PaperProps } from '@material-ui/core';
import Draggable from 'react-draggable';
import { Color } from 'interfaces/models/Color';
import { PersonCreateDto } from 'interfaces/dto/people/PersonCreateDto';
import { PersonPinCircle } from '@material-ui/icons';

const initialState: PersonDto = {
  id: 0,
  name: '',
  eyeColor: Color.BLACK, 
  hairColor: Color.BLACK, 
  location: { id: 0, x: 0, y: 0, z: 0 },
  birthday: '',
  height: 0,
  passportId: '',
};

const buildRequest = (state: any): PersonDto => {
  return {
    id: state.id,
    name: state.name,
    eyeColor: state.eyeColor,
    hairColor: state.hairColor,
    location: state.location,
    birthday: state.birthday,
    height: state.height,
    passportId: state.passportId,
  };
};

const buildHandleSave = (state: any): PersonCreateDto => {
  return {
    name: state.name,
    eyeColor: state.eyeColor,
    hairColor: state.hairColor,
    locationId: state.location.id,
    birthday: state.birthday,
    height: state.height,
    passportId: state.passportId,
  };
};



const fields = [
  { name: 'name', label: 'Name', type: 'text' as const },
  { name: 'eyeColor', label: 'Eye Color', type: 'text' as const },
  { name: 'hairColor', label: 'Hair Color', type: 'text' as const },
  { name: 'location', label: 'Location', type: 'text' as const },
  { name: 'birthday', label: 'Birthday', type: 'text' as const },
  { name: 'height', label: 'Height', type: 'number' as const },
  { name: 'passportId', label: 'Passport ID', type: 'text' as const },
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
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    validateForm();
  }, [item]);

  const validateForm = () => {
    if (!item?.name || item.name.trim() === '') {
      setError('Name cannot be empty');
      setIsValid(false);
      return;
    }
    if (item?.height == null || item.height <= 0) {
      setError('Height should be greater than zero');
      setIsValid(false);
      return;
    }
    if (!item?.eyeColor || !item?.location || !item?.birthday) {
      setError('All fields cannot be null');
      setIsValid(false);
      return;
    }
    setError(null);
    setIsValid(true);
  };

  const handleSave = (person: PersonDto) => {
    if (!isValid) return;

    const personCreateDto = buildHandleSave(person);

    if (person.id) {
      dispatch(updatePerson({ id: person.id, data: person }));
    } else {
      dispatch(createPerson(personCreateDto));
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
      error={error}
      isValid={isValid}
    />
  );
};

export default PersonModal;