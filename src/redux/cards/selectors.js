export const selectAllCards = state => state.cards.items;

export const selectLoading = state => state.cards.loading;

export const selectError = state => state.cards.error;

export const getCardById = state => state.cards.selectedCard;

export const selectCurrentFilter = state => state.cards.filterBy;

export const selectFilteredCards = state => {
  const initialValue = [];

  switch (state.cards.filterBy) {
    case 'without_priority':
      state.cards.items.map(item => {
        if (item.priority === 'without') {
          initialValue.push(item);
        }
      });
      return initialValue;

    case 'low':
      state.cards.items.map(item => {
        if (item.priority === 'low') {
          initialValue.push(item);
        }
      });
      return initialValue;

    case 'medium':
      state.cards.items.map(item => {
        if (item.priority === 'medium') {
          initialValue.push(item);
        }
      });
      return initialValue;

    case 'high':
      state.cards.items.map(item => {
        if (item.priority === 'high') {
          initialValue.push(item);
        }
      });
      return initialValue;

    default:
      return state.cards.items;
  }
};
