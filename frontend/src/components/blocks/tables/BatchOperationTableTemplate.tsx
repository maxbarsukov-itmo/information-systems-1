import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useDebounce, useInterval } from 'usehooks-ts';

import { Paper } from '@material-ui/core';
import { DataGridPro, GridColDef, GridSortModel, GridFilterModel, GridDensity } from '@mui/x-data-grid-pro';

import { useDispatch, useSelector } from 'hooks';
import { ELEMENTS_ON_PAGE, WS_URL, NO_WS_INTERVAL, TABLES_KEY } from 'config/constants';

import { sortModelToArgs } from 'utils/crud/sort';

import { Event } from 'interfaces/events/Event';
import ErrorComponent from 'components/blocks/Error';

import Footer from 'components/blocks/tables/utils/Footer';
import Toolbar from 'components/blocks/tables/utils/Toolbar';
import NoRowsOverlay from 'components/blocks/tables/utils/NoRowsOverlay';
import SkeletonLoadingOverlay from 'components/blocks/tables/utils/SkeletonCell';
import { RootState } from 'store';
import Storage from 'utils/Storage';

interface TableState {
  page: number;
  size: number;
  search: string;
  density: GridDensity;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}

interface BatchOperationTableTemplateProps<T> {
  resource: string;
  columns: GridColDef[];
  selector: (state: RootState) => any;
  handleEvent: (event: Event<T>) => void;
  fetchAction;
}

const BatchOperationTableTemplate = <T extends unknown>({
  resource,
  columns,
  selector,
  handleEvent,
  fetchAction,
}: BatchOperationTableTemplateProps<T>): JSX.Element => {
  const dispatch = useDispatch();

  const storageKey = `${TABLES_KEY}/${resource}`;
  const state: TableState = Storage.get(storageKey);

  const [filterModel, setFilterModel] = useState<GridFilterModel>(state?.filterModel || { items: [] });
  const [sortModel, setSortModel] = useState<GridSortModel>(state?.sortModel || []);
  const [page, setPage] = useState<number>(state?.page || 0);
  const [size, setSize] = useState<number>(state?.size || ELEMENTS_ON_PAGE);
  const [density, setDensity] = useState<GridDensity>(state?.density || 'standard');
  const [searchText, setSearchText] = React.useState(state?.search || '');
  const debouncedSearchText = useDebounce(searchText, 700);

  const { items, loading, error: errors } = useSelector(selector);
  const uuids = useSelector(state => state.requests.uuids);

  const fetch = () => {
    const requestData = { page, size, sort: sortModelToArgs(sortModel) };
    dispatch(fetchAction(requestData));
  };

  const updateState = (state) => {
    const oldState: TableState = Storage.get(storageKey);
    Storage.set(storageKey, Object.assign({}, oldState, state));
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
      const event: Event<T> = JSON.parse(evt.data);

      if (uuids.includes(event.requestUuid)) {
        console.log('🌐 WebSocket: event by current user. Ignored.');
        return;
      }

      console.log(`🌐 WebSocket: handling event ${event.eventType}.`);
      handleEvent(event);
    },
  });

  const allowedKeys = columns.map(c => c.field);

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
      if (page !== items.totalPages - 1) {
        setPage(page => page + 1);
      }
    }
  };

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {(loading.fetch || !items) &&
        <SkeletonLoadingOverlay columns={columns} pageSize={ELEMENTS_ON_PAGE} readyStatus={readyState} density={density} />
      }
      {!(loading.fetch) && items && !errors.fetch && (
        <Paper style={{ width: '100%' }}>
          <DataGridPro
            style={items.numberOfElements === 0 ? { height: '400px' }: {}}
            columns={columns}
            rows={items.content}
            components={{
              Toolbar,
              Footer,
              NoRowsOverlay,
            }}
            componentsProps={{
              footer: { status: readyState },
              toolbar: {
                value: searchText,
                onChange: (event) => setSearchText(event.target.value),
                clearSearch: () => setSearchText(''),
              },
            }}

            autoHeight
            loading={loading.fetch}
            columnBuffer={2}

            density={density}
            onStateChange={(v) => {
              if (v.density.value !== density) {
                setDensity(v.density.value);
                updateState({ density: v.density.value });
              }
            }}

            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={model => {
              setSortModel(model);
              updateState({ sortModel: model });
            }}

            filterMode="server"
            filterModel={filterModel}
            onFilterModelChange={model => {
              setFilterModel(model);
              updateState({ filterModel: model });
            }}

            pagination
            paginationMode="server"
            rowsPerPageOptions={[5, 10, 20, 50]}
            rowCount={items.totalElements}
            pageSize={items.size}
            onPageSizeChange={size => {
              setSize(size);
              updateState({ size: size });
            }}
            page={page}
            onPageChange={page => {
              setPage(page);
              updateState({ page: page });
            }}
          />
        </Paper>
      )}
      {errors.fetch && <ErrorComponent code={errors.fetch.code} message={errors.fetch.message} />}
    </div>
  );
};

export default BatchOperationTableTemplate;