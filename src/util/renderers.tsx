import React from 'react';
import { render } from 'react-dom';
import MainComponent from '../ui/MainComponent';
import ContainerContract from '../types/ContainerContract';

const renderAppInSuccessfulState = (appId: string, data: ContainerContract) =>
    render(<MainComponent data={data} />, document.getElementById(appId));

export default {
    renderAppInSuccessfulState,
};
