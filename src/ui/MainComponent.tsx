import axios from 'axios';
import { TabsPure } from 'nav-frontend-tabs';
import React, { useMemo } from 'react';
import ContainerContract from '../types/ContainerContract';
import { TilsynResponse } from '../types/TilsynResponse';
import { get } from '../util/httpUtils';
import Beredskapsperiodeoversikt from './components/beredskap/beredskapsperioderoversikt/Beredskapsperiodeoversikt';
import EtablertTilsyn from './components/etablertTilsyn/EtablertTilsyn';
import Nattevåksperiodeoversikt from './components/nattevåk/nattevåksperiodeoversikt/Nattevåksperiodeoversikt';
import PageContainer from './components/page-container/PageContainer';
import ContainerContext from './context/ContainerContext';
import ActionType from './mainActionTypes';
import styles from './mainComponent.less';
import mainComponentReducer from './mainReducer';

interface MainComponentProps {
    data: ContainerContract;
}

const tabs = ['Etablert tilsyn', 'Beredskap', 'Nattevåk'];

const MainComponent = ({ data }: MainComponentProps) => {
    const [state, dispatch] = React.useReducer(mainComponentReducer, {
        isLoading: true,
        etablertTilsyn: null,
        beredskap: null,
        nattevåk: null,
    });
    const { isLoading, etablertTilsyn, beredskap, nattevåk } = state;
    const [activeTab, setActiveTab] = React.useState(0);
    const { endpoints, httpErrorHandler } = data;
    const httpCanceler = useMemo(() => axios.CancelToken.source(), []);

    const getTilsyn = () =>
        get<TilsynResponse>(endpoints.tilsyn, httpErrorHandler, {
            cancelToken: httpCanceler.token,
        });

    React.useEffect(() => {
        let isMounted = true;
        getTilsyn()
            .then((tilsynResponse) => {
                if (isMounted) {
                    dispatch({ type: ActionType.OK, tilsynResponse });
                }
            })
            .catch(() => {
                dispatch({ type: ActionType.FAILED });
            });
        return () => {
            isMounted = false;
            httpCanceler.cancel();
        };
    }, []);

    return (
        <ContainerContext.Provider value={data}>
            <div className={styles.mainComponent}>
                <TabsPure
                    kompakt
                    tabs={tabs.map((tabName, index) => ({ label: tabName, aktiv: activeTab === index }))}
                    onChange={(event, clickedIndex) => setActiveTab(clickedIndex)}
                />
                <PageContainer isLoading={isLoading}>
                    <div className={styles.mainComponent__contentContainer}>
                        {activeTab === 0 && <EtablertTilsyn etablertTilsynData={etablertTilsyn} />}
                        {activeTab === 1 && <Beredskapsperiodeoversikt beredskapData={beredskap} />}
                        {activeTab === 2 && <Nattevåksperiodeoversikt nattevåkData={nattevåk} />}
                    </div>
                </PageContainer>
            </div>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
