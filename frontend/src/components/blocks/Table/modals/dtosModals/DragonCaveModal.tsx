import React from 'react';
import AddOrEditModal from '../AddOrEdit';
import { DragonCaveDto } from 'interfaces/dto/dragoncaves/DragonCaveDto';
import { useDispatch } from 'hooks';
import { createDragonCave, updateDragonCave } from 'store/dragoncaves';
import { Paper, PaperProps } from '@material-ui/core';
import Draggable from 'react-draggable';

const initialState: DragonCaveDto = {
  id: 0,
  depth: 0,
};

const buildRequest = (state: any): DragonCaveDto => {
  return {
    id: state.id,
    depth: state.depth,
  };
};

const fields = [
  { name: 'name', label: 'Name', type: 'text' as const },
  { name: 'location', label: 'Location', type: 'text' as const },
];

interface Props {
  item?: DragonCaveDto;
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

const DragonCaveModal: React.FC<Props> = ({ item, isOpen, setOpen }) => {
  const dispatch = useDispatch();

  const handleSave = (dragonCave: DragonCaveDto) => {
    if (dragonCave.id) {
      dispatch(updateDragonCave({ id: dragonCave.id, data: dragonCave }));
    } else {
      dispatch(createDragonCave(dragonCave));
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

export default DragonCaveModal;