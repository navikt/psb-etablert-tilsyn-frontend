import React from 'react';
import { createRoot } from 'react-dom/client';
import MainComponent from '../ui/MainComponent';
import ContainerContract from '../types/ContainerContract';

const renderAppInSuccessfulState = (appId: string, data: ContainerContract) => {
    const container = document.getElementById(appId);
    const root = createRoot(container);
    root.render(<MainComponent data={data} />);
};

export default {
    renderAppInSuccessfulState,
};
