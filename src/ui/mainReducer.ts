import { Period } from '@navikt/period-utils';
import BeredskapType from '../types/BeredskapType';
import NattevåkType from '../types/NattevåkType';
import { EtablertTilsynPerioder } from '../types/TilsynData';
import { TilsynResponse } from '../types/TilsynResponse';
import ActionType from './mainActionTypes';
import EtablertTilsynType from '../types/EtablertTilsynType';

interface MainComponentState {
    etablertTilsyn: EtablertTilsynType[];
    beredskap: BeredskapType;
    nattevåk: NattevåkType;
    tilsynHarFeilet: boolean;
    isLoading: boolean;
}

interface Action {
    type: ActionType;
    tilsynResponse?: TilsynResponse;
}

const mainComponentReducer = (state: MainComponentState, action: Action): Partial<MainComponentState> => {
    switch (action.type) {
        case ActionType.OK: {
            const { tilsynResponse } = action;
            const etablertTilsyn = tilsynResponse.etablertTilsynPerioder.map(
                (etablertTilsynPeriode) => new EtablertTilsynType(etablertTilsynPeriode)
            );
            const beredskap = new BeredskapType(tilsynResponse.beredskap);
            const nattevåk = new NattevåkType(tilsynResponse.nattevåk);
            return {
                ...state,
                etablertTilsyn,
                beredskap,
                nattevåk,
                tilsynHarFeilet: false,
                isLoading: false,
            };
        }
        case ActionType.FAILED:
            return {
                ...state,
                tilsynHarFeilet: true,
                isLoading: false,
            };
        case ActionType.PENDING:
            return {
                ...state,
                tilsynHarFeilet: false,
                isLoading: true,
            };
        default:
            return { ...state };
    }
};

export default mainComponentReducer;
