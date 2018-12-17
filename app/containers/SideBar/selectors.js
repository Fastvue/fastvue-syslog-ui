import { createSelector } from 'reselect';

const selectSideBar = (state) => state.get('sideBar');

const makeSelectSourceList = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('sourceList').toJS()
  );

const makeSelectIsAddSysLogSourceOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isAddSysLogSourceOpen')
  );

const makeSelectIsListeningPortModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isListeningPortModalOpen')
  );

const makeSelectSourceIdWhoseSourceEditorIsOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('sourceIdWhoseSourceEditorIsOpen')
  );

const makeSelectIsDeleteSourceModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isDeleteSourceModalOpen')
  );

const makeSelectIsListeningPortSuccessModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isListeningPortSuccessModalOpen')
  );

const makeSelectIsDeleteSourceSuccessModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isDeleteSourceSuccessModalOpen')
  );

const makeSelectToBeDeletedSource = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('toBeDeletedSource')
  );

const makeSelectAddOrUpdateSourceLoading = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('addOrUpdateSourceLoading')
  );

const makeSelectIsAddSourceSuccessModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isAddSourceSuccessModalOpen')
  );

const makeSelectActiveSource = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('activeSource').toJS()
  );

const makeSelectLastAddedSourceName = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('lastAddedSourceName')
  );

export {
  selectSideBar,
  makeSelectSourceList,
  makeSelectIsAddSysLogSourceOpen,
  makeSelectIsListeningPortModalOpen,
  makeSelectSourceIdWhoseSourceEditorIsOpen,
  makeSelectIsDeleteSourceModalOpen,
  makeSelectIsListeningPortSuccessModalOpen,
  makeSelectIsDeleteSourceSuccessModalOpen,
  makeSelectToBeDeletedSource,
  makeSelectAddOrUpdateSourceLoading,
  makeSelectIsAddSourceSuccessModalOpen,
  makeSelectActiveSource,
  makeSelectLastAddedSourceName
};
