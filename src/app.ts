import ContainerContract from './types/ContainerContract';
import renderers from './util/renderers';

interface ExtendedWindow extends Window {
    renderTilsynApp: (id: string, contract: ContainerContract) => void;
}

(window as Partial<ExtendedWindow>).renderTilsynApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
