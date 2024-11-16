import React from 'react';
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

  const handleSave = (coordinate: CoordinateDto) => {
    if (coordinate.id) {
      dispatch(updateCoordinate({ id: coordinate.id, data: coordinate }));
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
      paperComponent={DraggablePaper}
    />
  );
};

export default CoordinateModal;