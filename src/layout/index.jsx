import React, { useEffect, useCallback } from 'react';
import Header from './header';
import Footer from './footer';
import Loader from 'components/loader';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'components/alerts';
import { setPopupAlert } from 'redux-store/popups/popupSlice';

function Layout({ children }) {
  const dispatch = useDispatch();
  const { alertStatus, alertMessage, alertType } = useSelector((store) => store.popup.alert);
  const isLoaderOn = useSelector((store) => store.popup.isLoaderOn);

  const clearAlert = useCallback(() => {
    dispatch(setPopupAlert({ alertStatus: false, alertMessage: '', alertType: '' }));
  }, [dispatch]);

  useEffect(() => {
    if (alertStatus) {
      const timer = setTimeout(clearAlert, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertStatus, clearAlert]);

  return (
    <div className="container mx-auto">
      {alertStatus && <Alert message={alertMessage} type={alertType} />}
      {isLoaderOn && <Loader />}
      <Header />
      <div className="px-3">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;