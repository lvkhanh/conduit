import React from 'react';

const withProps = props => Component => routerProps => <Component {...routerProps} {...props}/>;

export default withProps;