import React, { useEffect, useState } from 'react';
import AddOrEditModal from '../AddOrEdit';
import { CoordinateDto } from 'interfaces/dto/coordinates/CoordinateDto';
import { useDispatch } from 'hooks';
import { createCoordinate, updateCoordinate } from 'store/coordinates';
import { Paper, PaperProps } from '@material-ui/core';
import Draggable from 'react-draggable';

const initialState: CoordinateDto = {
  id: 0,
  x: 0,
  y: 0,
};

const buildRequest = (state: any): CoordinateDto => {
  return {
    id: state.id,
    x: state.latitude,
    y: state.longitude,
  };
};

const fields = [
  { name: 'x', label: 'X', type: 'number' as const },
  { name: 'y', label: 'Y', type: 'number' as const },
];

interface Props {
  item?: CoordinateDto;
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

const CoordinateModal: React.FC<Props> = ({ item, isOpen, setOpen }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    validateForm();
  }, [item]);

  const validateForm = () => {
    if (item?.x == null || item?.y == null) {
      setError('X and Y fields cannot be null');
      setIsValid(false);
      return;
    }
    if (item.x > 301) {
      setError('X should be less or equal to 301');
      setIsValid(false);
      return;
    }
    setError(null);
    setIsValid(true);
  };

  const handleSave = (coordinate: CoordinateDto) => {
    if (!isValid) return;

    if (coordinate.id) {
      dispatch(updateCoordinate({ id: coordinate.id, updateDto: coordinate }));
    } else {
      dispatch(createCoordinate(coordinate));
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

export default CoordinateModal;
