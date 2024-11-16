export const sorting = (sortParams) =>
  sortParams.map(el => `sort=${el}`).join('&');

export const createCrudUri = (page, size, sort) =>
  `?page=${page}&size=${size}&${sorting(sort)}`;
