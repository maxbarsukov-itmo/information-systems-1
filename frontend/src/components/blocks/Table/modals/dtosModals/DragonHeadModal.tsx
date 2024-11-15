import React from 'react';
import AddOrEditModal from '../AddOrEdit';
import { DragonHeadDto } from 'interfaces/dto/dragonheads/DragonHeadDto';
import { useDispatch } from 'hooks';
import { createDragonHead, updateDragonHead } from 'store/dragonheads';

const initialState: DragonHeadDto = {
  id: 0,
  size: 0,
  toothCount: 0,
};

const buildRequest = (state: any): DragonHeadDto => {
  return {
    id: state.id,
    size: state.name,
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
    />
  );
};

export default DragonHeadModal;