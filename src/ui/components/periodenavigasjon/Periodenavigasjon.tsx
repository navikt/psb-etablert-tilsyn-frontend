import React from 'react';
import { Element, Undertittel } from 'nav-frontend-typografi';
import InteractiveList from '../interactive-list/InteractiveList';
import VurderingsperiodeElement from '../vurderingsperiode/VurderingsperiodeElement';
import PeriodeSomSkalVurderes from '../periode-som-skal-vurderes/PeriodeSomSkalVurderes';
import styles from './periodenavigasjon.less';
import { Beredskapsperiode, VurdertBeredskapsperiode } from '../../../types/Beredskapsperiode';

interface PeriodenavigasjonProps {
    perioderTilVurdering: Beredskapsperiode[];
    vurdertePerioder: VurdertBeredskapsperiode[];
    onPeriodeValgt: (periode: Beredskapsperiode) => void;
}

const Periodenavigasjon = ({
    perioderTilVurdering,
    vurdertePerioder,
    onPeriodeValgt,
}: PeriodenavigasjonProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const vurdertePerioderElements = vurdertePerioder.map(({ periode, resultat, kilde }) => {
        return <VurderingsperiodeElement periode={periode} resultat={resultat} kilde={kilde} />;
    });

    const periodeTilVurderingElements = perioderTilVurdering.map(({ periode }) => {
        return <PeriodeSomSkalVurderes periode={periode} />;
    });

    const perioder = [...perioderTilVurdering, ...vurdertePerioder];
    const elements = [...periodeTilVurderingElements, ...vurdertePerioderElements];
    const antallPerioder = elements.length;

    return (
        <div className={styles.vurderingsnavigasjon}>
            {antallPerioder === 0 && <p>Ingen vurderinger å vise</p>}
            {antallPerioder > 0 && (
                <div className={styles.vurderingsvelgerContainer}>
                    <div className={styles.vurderingsvelgerContainer__columnHeadings}>
                        <Element className={styles['vurderingsvelgerContainer__columnHeading--first']}>Status</Element>
                        <Element className={styles['vurderingsvelgerContainer__columnHeading--second']}>
                            Periode
                        </Element>

                        <Element className={styles['vurderingsvelgerContainer__columnHeading--third']}>Kilde</Element>
                    </div>
                    <InteractiveList
                        elements={elements.map((element, currentIndex) => ({
                            content: element,
                            active: activeIndex === currentIndex,
                            key: `${currentIndex}`,
                            onClick: () => {
                                setActiveIndex(currentIndex);
                                const periodeIndex = elements.indexOf(element);
                                onPeriodeValgt(perioder[periodeIndex]);
                            },
                        }))}
                    />
                </div>
            )}
        </div>
    );
};

export default Periodenavigasjon;
