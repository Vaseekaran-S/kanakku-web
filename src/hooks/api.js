import { setLoaderStatus, setPopupAlert } from 'redux-store/popups/popupSlice'

export const useKanakkuApi = async (fun, data, dispatch) => {
    dispatch(setLoaderStatus(true));
    const response = await fun(data);
    dispatch(setLoaderStatus(false));
    dispatch(setPopupAlert({ alertStatus: true, alertMessage: response?.message, alertType: response?.type }))
    return response;
}