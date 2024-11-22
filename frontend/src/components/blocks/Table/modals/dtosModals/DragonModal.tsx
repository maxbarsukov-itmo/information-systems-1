import React, { useEffect, useState } from 'react';
import AddOrEditModal from '../AddOrEdit';
import { DragonDto } from 'interfaces/dto/dragons/DragonDto';
import { useDispatch } from 'hooks';
import { createDragon, updateDragon } from 'store/dragons';
import { Paper, PaperProps } from '@material-ui/core';
import Draggable from 'react-draggable';
import { DragonType } from 'interfaces/models/DragonType';
import { Color } from 'interfaces/models/Color';
import { DragonCreateDto } from 'interfaces/dto/dragons/DragonCreateDto';
import dragoncaves from 'store/dragoncaves';

const initialState: DragonDto = {
  id: 0,
  name: '',
  coordinates: { id: 0, x: 0, y: 0 },
  cave: { id: 0, depth: 0 },
  killer: { id: 0, name: '',
  eyeColor: Color.BLACK,
  location: { id: 0, x: 0, y: 0, z: 0 },
  birthday: '', height: 0 },
  head: { id: 0, size: 0, toothCount: 0 },
  type: DragonType.FIRE,
  age: 0,
  wingspan: 0,
  speaking: false,
};

const buildRequest = (state: any): DragonDto => {
  return {
    id: state.id,
    name: state.name,
    coordinates: state.coordinates,
    cave: state.cave,
    killer: state.killer,
    head: state.head,
    type: state.type,
    age: state.age,
    wingspan: state.wingspan,
    speaking: state.speaking,
  };
};

const buildHandleSave = (state: DragonDto): DragonCreateDto => {
  return {
    name: state.name,
    coordinatesId: state.coordinates.id,
    caveId: state.cave?.id,
    killerId: state.killer?.id,
    headId: state.head.id,
    type: state.type,
    age: state.age,
    wingspan: state.wingspan,
    speaking: state.speaking,
  };
};

const fields = [
  { name: 'name', label: 'Name', type: 'text' as const },
  { name: 'coordinates', label: 'Coordinates', type: 'text' as const },
  { name: 'cave', label: 'Cave', type: 'text' as const },
  { name: 'killer', label: 'Killer', type: 'text' as const },
  { name: 'head', label: 'Head', type: 'text' as const },
  { name: 'type', label: 'Type', type: 'text' as const },
  { name: 'age', label: 'Age', type: 'number' as const },
  { name: 'wingspan', label: 'Wingspan', type: 'number' as const },
  { name: 'speaking', label: 'Speaking', type: 'checkbox' as const },
];

interface Props {
  item?: DragonDto;
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

const DragonModal: React.FC<Props> = ({ item, isOpen, setOpen }) => {
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
    if (!item?.coordinates || !item?.head || !item?.type) {
      setError('Coordinates, Head, and Type fields cannot be null');
      setIsValid(false);
      return;
    }
    setError(null);
    setIsValid(true);
  };

  const handleSave = (dragon: DragonDto) => {
    if (!isValid) return;

    const dragonCreateDto = buildHandleSave(dragon);

    if (dragon.id) {
      dispatch(updateDragon({ id: dragon.id, updateDto: dragon }));
    } else {
      dispatch(createDragon(dragonCreateDto));
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

export default DragonModal;
