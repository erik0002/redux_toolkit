import {uiActions} from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(
                'https://redux-toolkit-1111b-default-rtdb.europe-west1.firebasedatabase.app/car.json'
            );

            if(!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData))
            dispatch(
                uiActions.showNotifications({
                    status: 'success',
                    title: 'Success!',
                    message: 'Fetch cart data successfully!'
                })
            );
        } catch(error) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!'
                })
            );
        }
    }
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotifications({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!'
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://redux-toolkit-1111b-default-rtdb.europe-west1.firebasedatabase.app/car.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed.')
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotifications({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!'
                })
            );
        } catch(e) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!'
                })
            );
        }
    };
};
