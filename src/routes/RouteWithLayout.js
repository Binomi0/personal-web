import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RouteWithLayout = ({ layout, component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      createElement(layout, props, createElement(component, props))
    }
  />
);

RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  component: PropTypes.object.isRequired,
};

export default RouteWithLayout;
