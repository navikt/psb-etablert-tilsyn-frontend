import { TabsPure } from 'nav-frontend-tabs';
import React from 'react';
import { ContainerContract } from '../types/ContainerContract';
import EtablertTilsyn from './components/etablertTilsyn/EtablertTilsyn';
import ContainerContext from './context/ContainerContext';
import styles from './mainComponent.less';
import Beredskap from './components/beredskap/Beredskap';

interface MainComponentProps {
    data: ContainerContract;
}

const tabs = ['Etablert tilsyn', 'Beredskap', 'Nattevåk'];

const MainComponent = ({ data }: MainComponentProps) => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <ContainerContext.Provider value={data}>
            <div className={styles.mainComponent}>
                <TabsPure
                    kompakt
                    tabs={tabs.map((tabName, index) => ({ label: tabName, aktiv: activeTab === index }))}
                    onChange={(event, clickedIndex) => setActiveTab(clickedIndex)}
                />
                <div className={styles.mainComponent__contentContainer}>
                    {activeTab === 0 && <EtablertTilsyn />}
                    {activeTab === 1 && <Beredskap />}
                </div>
            </div>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
