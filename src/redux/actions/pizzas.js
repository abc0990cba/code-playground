import axios from 'axios';

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  axios.get("http://localhost:3001/pizzas", {
    params: {
      category: category,
      _sort: sortBy.type,
      _order: sortBy.order,
    },
  })
    .then(({ data }) => {
      dispatch(setPizzas(data));
    });
};

// export const fetchPizzas = (category, sortBy) => async (dispatch) => {
//   dispatch(setLoaded(false));
//   const axiosObj = await axios.get("http://localhost:3001/pizzas", {
//     params: {
//       category: category,
//       _sort: sortBy.type,
//       _order: sortBy.order,
//     },
//   });
//   dispatch(setPizzas(axiosObj.data));
//   dispatch(setLoaded(true));
// };


export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});
