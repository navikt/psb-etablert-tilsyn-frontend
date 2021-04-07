import axios from 'axios';
import Lenke from 'nav-frontend-lenker';
import { Element, Undertittel } from 'nav-frontend-typografi';
import React, { useMemo, useState } from 'react';
import EtablertTilsynResponse from '../../../types/EtablertTilsynResponse';
import Kilde from '../../../types/Kilde';
import { prettifyPeriod } from '../../../util/formats';
import { get } from '../../../util/httpUtils';
import ContainerContext from '../../context/ContainerContext';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import PageContainer from '../page-container/PageContainer';
import styles from './etablertTilsyn.less';

const renderIcon = (kilde: Kilde) => {
    if (kilde === Kilde.SØKER) {
        return (
            <ContentWithTooltip tooltipText="Søker">
                <OnePersonIconGray />
            </ContentWithTooltip>
        );
    }
    return (
        <ContentWithTooltip tooltipText="Annen part">
            <OnePersonOutlineGray />
        </ContentWithTooltip>
    );
};

const EtablertTilsyn = (): JSX.Element => {
    const { endpoints, httpErrorHandler } = React.useContext(ContainerContext);
    const httpCanceler = useMemo(() => axios.CancelToken.source(), []);
    const [etablertTilsyn, setEtablertTilsyn] = useState([]);
    const [etablertTilsynError, setEtablertTilsynError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getEtablertTilsyn = () =>
        get<EtablertTilsynResponse>(endpoints.etablertTilsyn, httpErrorHandler, {
            cancelToken: httpCanceler.token,
        });

    React.useEffect(() => {
        let isMounted = true;
        getEtablertTilsyn()
            .then((etablertTilsynData) => {
                if (isMounted) {
                    setEtablertTilsyn(etablertTilsynData.etablertTilsyn);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setEtablertTilsynError(true);
                setIsLoading(false);
            });
        return () => {
            isMounted = false;
            httpCanceler.cancel();
        };
    }, []);

    const harVurderinger = etablertTilsyn.length > 0;

    return (
        <PageContainer isLoading={isLoading} hasError={etablertTilsynError}>
            <Undertittel>Etablert tilsyn</Undertittel>
            <div className={styles.etablertTilsyn}>
                <Lenke href="#">Gjør endringer i Punsj</Lenke>
                {!harVurderinger && <p>Ingen vurderinger å vise</p>}
                {harVurderinger && (
                    <table className={styles.etablertTilsynTabell}>
                        <thead>
                            <tr className={styles.etablertTilsynTabell__columnHeadings}>
                                <th>
                                    <Element className={styles['etablertTilsynTabell__columnHeading--first']}>
                                        Periode
                                    </Element>
                                </th>
                                <th>
                                    <Element className={styles['etablertTilsynTabell__columnHeading--second']}>
                                        Timer/dag
                                    </Element>
                                </th>
                                <th>
                                    <Element className={styles['etablertTilsynTabell__columnHeading--third']}>
                                        Kilde
                                    </Element>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {etablertTilsyn.map((tilsyn, index) => (
                                <tr key={index}>
                                    <td className={styles.etablertTilsynTabell__period}>
                                        <span className={styles.visuallyHidden}>Periode</span>
                                        {prettifyPeriod(tilsyn.periode)}
                                    </td>
                                    <td className={styles.etablertTilsynTabell__hours}>
                                        <span className={styles.visuallyHidden}>Timer/dag</span>
                                        {tilsyn.timerDag}
                                    </td>

                                    <td className={styles.etablertTilsynTabell__icon}>
                                        <span className={styles.visuallyHidden}>Kilde</span>
                                        {renderIcon(tilsyn.kilde)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </PageContainer>
    );
};

export default EtablertTilsyn;
