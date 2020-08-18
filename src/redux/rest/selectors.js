import { createSelector } from 'reselect';
import { union } from 'lodash';
import { getRecordData } from '../../utils/tools';

const getRawResources = (state, resource) => state.rest[resource];
const getRawReferenceResources = (state, props) => state.rest[`${props.reference}Reference`];
const getRawResourcesByReference = (state, props) => state.rest[`${props.reference}`];
const getReference = (state, props) => props.reference;
const getSourceOfReference = (state, props) => props.source;
const getRecordOfReference = (state, props) => props.record;
const getMappedByOfReference = (state, props) => props.mappedBy;

export const getListResourceData = createSelector(
  [getRawResources],
  resources => {
    return resources && resources.ids ? resources.ids.map(id => resources.list[id]) : [];
  },
);

export const getResources = createSelector(
  [getRawResources],
  resources => {
    return resources && resources.ids
      ? { ...resources, list: resources.ids.map(id => resources.list[id]) }
      : resources;
  },
);

export const getReferenceResources = createSelector(
  [getRawReferenceResources, getRawResourcesByReference],
  (references, resources = { ids: [], list: {} }) => {
    const formattedIds =
      references && references.ids && resources.ids
        ? union(references.ids, resources.ids)
        : resources.ids;
    const formattedData =
      references && references.list && resources.list
        ? { ...references.list, ...resources.list }
        : resources.list;
    return formattedIds ? formattedIds.map(id => formattedData[id]) : [];
  },
);

export const getTotalResources = createSelector(
  [getRawResources],
  resources => {
    return resources && resources.count ? resources.count : 0;
  },
);
export const getResourcesObjFormater = createSelector(
  [getRawResources],
  resources => {
    return resources && resources.list ? resources.list : {};
  },
);

export const getOneRecord = createSelector(
  [getRawResources],
  resources => {
    return resources && resources.list ? resources.list[resources.currentId] : null;
  },
);
export const getLoading = createSelector(
  [getRawResources],
  resources => {
    return resources && resources.loading ? resources.loading : false;
  },
);

export const getFilters = createSelector(
  [getRawResources],
  resources => {
    return resources ? { limit: resources.limit, skip: resources.skip } : undefined;
  },
);

export const getReferenceData = createSelector(
  [
    getRawReferenceResources,
    getReference,
    getSourceOfReference,
    getRecordOfReference,
    getMappedByOfReference,
  ],
  (referenceResources, reference, source, record) => {
    return referenceResources && referenceResources.list
      ? referenceResources.list[getRecordData(record, source)]
      : null;
  },
);
