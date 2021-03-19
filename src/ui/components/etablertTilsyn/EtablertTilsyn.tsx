import Lenke from 'nav-frontend-lenker';
import { Element, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import Kilde from '../../../types/Kilde';
import { prettifyPeriod } from '../../../util/formats';
import ContainerContext from '../../context/ContainerContext';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import styles from './etablertTilsyn.less';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';

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

const EtablertTilsynTabell = (): JSX.Element => {
    const { etablertTilsyn } = React.useContext(ContainerContext);

    const antallPerioder = etablertTilsyn.length;

    return (
        <>
            <Undertittel>Etablert tilsyn</Undertittel>
            <div className={styles.etablertTilsyn}>
                <Lenke href="#">Gjør endringer i Punsj</Lenke>
                {antallPerioder === 0 && <p>Ingen vurderinger å vise</p>}
                {antallPerioder > 0 && (
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

                                    <td className={styles.etablertTilsynTabell__icon}>{renderIcon(tilsyn.kilde)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default EtablertTilsynTabell;
