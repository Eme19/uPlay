import React from "react";
import { Route, Navigate } from "react-router-dom";

const DeviceRoute = ({
  mobileComponent: MobileComponent,
  desktopComponent: DesktopComponent,
  ...rest
}) => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  return (
    <Route
      {...rest}
      element={isMobile ? <MobileComponent /> : <DesktopComponent />}
    />
  );
};

export default DeviceRoute;
