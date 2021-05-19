import renderers from './util/renderers';

(window as any).renderTilsynApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
