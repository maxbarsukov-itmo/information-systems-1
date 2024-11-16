import React from 'react';
import AddOrEditModal from '../AddOrEdit';
import { LocationDto } from 'interfaces/dto/locations/LocationDto';
import { useDispatch } from 'hooks';
import { createLocation, updateLocation } from 'store/locations';
import { Paper, PaperProps } from '@material-ui/core';
import Draggable from 'react-draggable';

const initialState: LocationDto = {
  id: 0,
  x: 0,
  y: 0,
  z: 0,
};

const buildRequest = (state: any): LocationDto => {
  return {
    id: state.id,
    x: state.x,
    y: state.y,
    z: state.z,
  };
};

const fields = [
  { name: 'x', label: 'X', type: 'number' as const },
  { name: 'y', label: 'Y', type: 'number' as const },
  { name: 'z', label: 'Z', type: 'number' as const },
];

interface Props {
  item?: LocationDto;
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

const LocationModal: React.FC<Props> = ({ item, isOpen, setOpen }) => {
  const dispatch = useDispatch();

  const handleSave = (location: LocationDto) => {
    if (location.id) {
      dispatch(updateLocation({ id: location.id, data: location }));
    } else {
      dispatch(createLocation(location));
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

export default LocationModal;