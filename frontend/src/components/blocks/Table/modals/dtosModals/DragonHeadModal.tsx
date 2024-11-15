import React from 'react';
import AddOrEditModal from '../AddOrEdit';
import { DragonHeadDto } from 'interfaces/dto/dragonheads/DragonHeadDto';
import { useDispatch } from 'hooks';
import { createDragonHead, updateDragonHead } from 'store/dragonheads';
import { Paper, PaperProps } from '@material-ui/core';
import Draggable from 'react-draggable';

const initialState: DragonHeadDto = {
  id: 0,
  size: 0,
  toothCount: 0,
};

const buildRequest = (state: any): DragonHeadDto => {
  return {
    id: state.id,
    size: state.size,
    toothCount: state.toothCount,
  };
};

const fields = [
  { name: 'size', label: 'Size', type: 'number' as const },
  { name: 'toothCount', label: 'Tooth Count', type: 'number' as const },
];

interface Props {
  item?: DragonHeadDto;
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

const DragonHeadModal: React.FC<Props> = ({ item, isOpen, setOpen }) => {
  const dispatch = useDispatch();

  const handleSave = (dragonHead: DragonHeadDto) => {
    if (dragonHead.id) {
      dispatch(updateDragonHead({ id: dragonHead.id, data: dragonHead }));
    } else {
      dispatch(createDragonHead(dragonHead));
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

export default DragonHeadModal;