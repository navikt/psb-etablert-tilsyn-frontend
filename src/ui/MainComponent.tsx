import React, { useState } from 'react';
import { ContainerContract } from '../types/ContainerContract';
import ContainerContext from './context/ContainerContext';
import styles from './mainComponent.less';
import NavigationWithDetailView from './components/navigation-with-detail-view/NavigationWithDetailView';
import EtablertTilsynTabell from './components/etablertTilsyn/EtablertTilsyn';
import { EtablertTilsynsperiode } from '../types/EtablertTilsynsperiode';
import { Undertittel } from 'nav-frontend-typografi';

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({ data }: MainComponentProps) => {
    const [valgtPeriode, setValgtPeriode] = useState<EtablertTilsynsperiode>(null);

    return (
        <ContainerContext.Provider value={data}>
            <div className={styles.mainComponent}>
                <Undertittel>Etablert tilsyn</Undertittel>
                <EtablertTilsynTabell etablertTilsyn={data.etablertTilsyn} />
            </div>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
