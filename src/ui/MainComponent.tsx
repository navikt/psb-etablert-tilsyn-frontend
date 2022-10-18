import { get } from '@navikt/k9-http-utils';
import { ChildIcon, Infostripe, PageContainer, WarningIcon } from '@navikt/ft-plattform-komponenter';
import axios from 'axios';
import classnames from 'classnames';
import { TabsPure } from 'nav-frontend-tabs';
import React, { useMemo } from 'react';
import '@navikt/ft-plattform-komponenter/dist/style.css';
import '@navikt/ds-css';
import ContainerContract from '../types/ContainerContract';
import { TilsynResponse } from '../types/TilsynResponse';
import Alertstripe from './components/alertstripe/Alertstripe';
import Beredskapsperiodeoversikt from './components/beredskap/beredskapsperioderoversikt/Beredskapsperiodeoversikt';
import EtablertTilsyn from './components/etablertTilsyn/EtablertTilsyn';
import Nattevåksperiodeoversikt from './components/nattevåk/nattevåksperiodeoversikt/Nattevåksperiodeoversikt';
import ContainerContext from './context/ContainerContext';
import ActionType from './mainActionTypes';
import styles from './mainComponent.css';
import mainComponentReducer from './mainReducer';

interface MainComponentProps {
    data: ContainerContract;
}

const tabs = ['Etablert tilsyn', 'Beredskap', 'Nattevåk'];

interface TabItemProps {
    label: string;
    showWarningIcon: boolean;
}

const TabItem = ({ label, showWarningIcon }: TabItemProps) => {
    const cls = classnames(styles.tabItem, {
        [styles.tabItemExtended]: showWarningIcon,
    });
    return (
        <div className={cls}>
            {label}
            {showWarningIcon && (
                <div className={styles.tabItem__warningIcon}>
                    <WarningIcon />
                </div>
            )}
        </div>
    );
};

const setDefaultActiveTabIndex = ({ harAksjonspunktForBeredskap, harAksjonspunktForNattevåk }: ContainerContract) => {
    if (harAksjonspunktForBeredskap) {
        return 1;
    }
    if (harAksjonspunktForNattevåk) {
        return 2;
    }
    return 0;
};

const MainComponent = ({ data }: MainComponentProps) => {
    const [state, dispatch] = React.useReducer(mainComponentReducer, {
        isLoading: true,
        etablertTilsyn: null,
        beredskap: null,
        nattevåk: null,
    });
    const { isLoading, etablertTilsyn, beredskap, nattevåk, tilsynHarFeilet } = state;
    const { endpoints, httpErrorHandler, harAksjonspunktForBeredskap, harAksjonspunktForNattevåk, saksbehandlere } =
        data;
    const [activeTab, setActiveTab] = React.useState(setDefaultActiveTabIndex(data));
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

    if (tilsynHarFeilet) {
        return (
            <Alertstripe type="info">
                Noe gikk galt under henting av informasjon om etablert tilsyn. Dette kan skyldes at informasjon om
                etablert tilsyn ikke er tilgjengelig ennå, og at andre steg i behandlingen må fullføres før de kan vises
                her.
            </Alertstripe>
        );
    }

    return (
        <ContainerContext.Provider value={data}>
            <Infostripe
                text="Etablert tilsyn og vurdering av beredskap og nattevåk gjelder barnet og er felles for alle parter."
                iconRenderer={() => <ChildIcon />}
            />
            <div className={styles.mainComponent}>
                <TabsPure
                    kompakt
                    tabs={tabs.map((tabName, index) => ({
                        label: (
                            <TabItem
                                label={tabName}
                                showWarningIcon={
                                    (index === 1 && harAksjonspunktForBeredskap) ||
                                    (index === 2 && harAksjonspunktForNattevåk)
                                }
                            />
                        ),
                        aktiv: activeTab === index,
                    }))}
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
