import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useInterval } from 'usehooks-ts';

import { Paper } from '@material-ui/core';
import { DataGridPro, GridColDef, GridSortModel, GridFilterModel } from '@mui/x-data-grid-pro';

import { useDispatch, useSelector } from 'hooks';

import { SearchDto, SearchCriteria, getNumberFilterOperations, Operation, getSpecialOperators } from 'utils/search';

import Paged from 'interfaces/models/Paged';
import { Event } from 'interfaces/events/Event';
import { DragonCaveDto } from 'interfaces/dto/dragoncaves/DragonCaveDto';
import { ELEMENTS_ON_PAGE, WS_URL } from 'config/constants';
import { fetchDragonCaves, searchDragonCaves } from 'store/dragoncaves';
import ErrorComponent from 'components/blocks/Error';

import Footer from 'components/blocks/tables/utils/Footer';
import Toolbar from 'components/blocks/tables/utils/Toolbar';
import SkeletonLoadingOverlay from 'components/blocks/tables/utils/SkeletonCell';
import { renderHeader } from 'components/blocks/tables/utils/renderHeader';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    description: 'id',
    flex: 1,
    filterOperators: getNumberFilterOperations(),
    renderHeader,
  },
  {
    field: 'depth',
    headerName: 'Depth',
    description: 'depth',
    flex: 1,
    filterOperators: getNumberFilterOperations(),
  },
];

const DragonCavesTable = () => {
  const NO_WS_INTERVAL = 5000;

  const dispatch = useDispatch();

  const sortModelToArgs = (model) => model.filter(item => item.sort === 'asc' || item.sort === 'desc').map(sortItem => `${sortItem.field},${sortItem.sort}`);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(ELEMENTS_ON_PAGE);

  const dragonCaves: Paged<DragonCaveDto> = useSelector(state => state.dragonCaves.items);
  const loading = useSelector(state => state.dragonCaves.loading);
  const errors = useSelector(state => state.dragonCaves.error);
  const uuids = useSelector(state => state.requests.uuids);

  const handleEvent = (event: Event<DragonCaveDto>) => {
    // TODO handle events
    return;
  };

  const filterToSearchDto = (filter: GridFilterModel): SearchDto => {
    const searchCriteria: SearchCriteria[] = filter.items.filter(item => !!item.value).map(item => {
      const specOp = getSpecialOperators(item.operatorValue);
      return {
        filterKey: item.columnField,
        value: specOp?.value || item.value || '',
        operation: (specOp?.operatorValue || item.operatorValue) as Operation,
      };
    });
    return {
      searchCriteriaList: searchCriteria,
      dataOption: (filter.linkOperator === 'and' ? 'all' : 'any'),
    };
  };

  const fetch = () => {
    const requestData = { page, size, sort: sortModelToArgs(sortModel) };
    if (filterModel.items.length > 0) {
      dispatch(searchDragonCaves({ ...requestData, search: filterToSearchDto(filterModel) }));
    } else {
      dispatch(fetchDragonCaves(requestData));
    }
  };

  useEffect(() => {
    fetch();
  }, [page, size, JSON.stringify(sortModelToArgs(sortModel)), JSON.stringify(filterModel)]);

  const supportsWebSockets = 'WebSocket' in window || 'MozWebSocket' in window;
  if (!supportsWebSockets) {
    console.error('WebSocket not supported!');
    useInterval(
      () => {
        fetch();
      },
      !loading.fetch ? NO_WS_INTERVAL : null
    );
  }

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    filter: () => false,
    shouldReconnect: () => true,
    onOpen: () => console.log('🌐 WebSocket connection established.'),
    onClose: () => console.log('🌐 WebSocket connection closed.'),
    onError: () => console.error('🌐 WebSocket error.'),

    onMessage: (evt) => {
      console.log('🌐 WebSocket: new message.');
      const event: Event<DragonCaveDto> = JSON.parse(evt.data);

      if (uuids.includes(event.requestUuid)) {
        console.log('🌐 WebSocket: event by current user. Ignored.');
        return;
      }

      console.log(`🌐 WebSocket: handling event ${event.eventType}.`);
      handleEvent(event);
    },
  });

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isRightSwipe) {
      if (page !== 0) {
        setPage(page => page - 1);
      }
    }
    if (isLeftSwipe) {
      if (page !== dragonCaves.totalPages - 1) {
        setPage(page => page + 1);
      }
    }
  };

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {(loading.fetch || !dragonCaves) &&
        <SkeletonLoadingOverlay columns={columns} pageSize={ELEMENTS_ON_PAGE} readyStatus={readyState} />
      }
      {!loading.fetch && dragonCaves && !errors.fetch && (
        <Paper style={{ width: '100%' }}>
          <DataGridPro
            columns={columns}
            rows={dragonCaves.content}
            components={{
              Toolbar,
              Footer,
            }}
            componentsProps={{
              footer: { status: readyState },
            }}

            autoHeight
            loading={loading.fetch}
            columnBuffer={2}

            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={setSortModel}

            filterMode="server"
            onFilterModelChange={setFilterModel}

            pagination
            paginationMode="server"
            rowsPerPageOptions={[10, 20, 50]}
            rowCount={dragonCaves.totalElements}
            pageSize={dragonCaves.size}
            onPageSizeChange={setSize}
            page={page}
            onPageChange={setPage}
          />
        </Paper>
      )}
      {errors.fetch && <ErrorComponent code={errors.fetch.code} message={errors.fetch.message} />}
    </div>
  );
};

export default React.memo(DragonCavesTable);
