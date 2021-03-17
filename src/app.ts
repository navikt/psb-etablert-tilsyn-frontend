import renderers from './util/renderers';

(window as any).renderEtablertTilsynApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
