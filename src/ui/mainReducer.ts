import BeredskapType from '../types/BeredskapType';
import EtablertTilsynType from '../types/EtablertTilsynType';
import NattevåkType from '../types/NattevåkType';
import { TilsynResponse } from '../types/TilsynResponse';
import ActionType from './mainActionTypes';

interface MainComponentState {
    etablertTilsyn: EtablertTilsynType[];
    beredskap: BeredskapType;
    nattevåk: NattevåkType;
    smurtEtablertTilsynPerioder: EtablertTilsynType[];
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
            const smurtEtablertTilsynPerioder = tilsynResponse.smortEtablertTilsynPerioder.map(
                (etablertTilsynPeriode) => new EtablertTilsynType(etablertTilsynPeriode)
            );
            return {
                ...state,
                etablertTilsyn,
                beredskap,
                nattevåk,
                smurtEtablertTilsynPerioder,
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
