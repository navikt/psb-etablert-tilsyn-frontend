import Lenke from 'nav-frontend-lenker';
import { Element, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import EtablertTilsynType from '../../../types/EtablertTilsynType';
import Kilde from '../../../types/Kilde';
import Box, { Margin } from '../box/Box';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
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

interface EtablertTilsynProps {
    etablertTilsynData: EtablertTilsynType[];
}

const EtablertTilsyn = ({ etablertTilsynData }: EtablertTilsynProps): JSX.Element => {
    const harVurderinger = etablertTilsynData.length > 0;

    return (
        <div className={styles.etablertTilsyn}>
            <Box marginBottom={Margin.large}>
                <Undertittel className={styles.etablertTilsyn__heading}>Alle perioder</Undertittel>
            </Box>
            <Lenke className={styles.etablertTilsyn__lenke} href="#">
                Gjør endringer i Punsj
            </Lenke>
            {!harVurderinger && (
                <p className={styles.etablertTilsyn__ingenTilsyn}>Søker har ikke oppgitt etablert tilsyn</p>
            )}
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
                        {etablertTilsynData.map((tilsyn) => (
                            <tr key={tilsyn.periode.prettifyPeriod()}>
                                <td className={styles.etablertTilsynTabell__period}>
                                    <span className={styles.visuallyHidden}>Periode</span>
                                    {tilsyn.periode.prettifyPeriod()}
                                </td>
                                <td className={styles.etablertTilsynTabell__hours}>
                                    <span className={styles.visuallyHidden}>Timer/dag</span>
                                    {tilsyn.tidPerDag}
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
    );
};

export default EtablertTilsyn;
