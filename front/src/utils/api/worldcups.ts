import axios from 'axios';

interface pagingQueryType {
  offset: number;
  limit: number;
}
interface searchQuerytype {
  offset: number;
  limit: number;
  search: string;
}
export const getWorldcupList = async (query: pagingQueryType) => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
    },
  });
  return response.data;
};
export const getWorldcupListByKeyword = async (query: searchQuerytype) => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
      search: query.search,
    },
  });
  return response.data;
};
