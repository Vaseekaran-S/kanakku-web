import { useDispatch } from 'react-redux';
import { setLoaderStatus, setPopupAlert } from 'redux-store/popups/popupSlice';

const useKanakkuApi = () => {
    const dispatch = useDispatch();

    const apiCall = async (fun, data) => {
        dispatch(setLoaderStatus(true));
        const response = await fun(data);
        dispatch(setLoaderStatus(false));
        dispatch(setPopupAlert({ alertStatus: true, alertMessage: response?.message, alertType: response?.type }));
        return response;
    };

    return apiCall;
};

export default useKanakkuApi;
