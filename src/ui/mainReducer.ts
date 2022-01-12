import BeredskapType from '../types/BeredskapType';
import EtablertTilsynType from '../types/EtablertTilsynType';
import NattevåkType from '../types/NattevåkType';
import Saksbehandlere from '../types/Saksbehandlere';
import { TilsynResponse } from '../types/TilsynResponse';
import ActionType from './mainActionTypes';

interface MainComponentState {
    etablertTilsyn: EtablertTilsynType[];
    beredskap: BeredskapType;
    nattevåk: NattevåkType;
    tilsynHarFeilet: boolean;
    isLoading: boolean;
    saksbehandlere: Saksbehandlere;
}

interface Action {
    type: ActionType;
    tilsynResponse?: TilsynResponse;
    saksbehandlere?: Saksbehandlere
}

const mainComponentReducer = (state: MainComponentState, action: Action): Partial<MainComponentState> => {
    switch (action.type) {
        case ActionType.OK: {
            const { tilsynResponse, saksbehandlere } = action;
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
                saksbehandlere,
                tilsynHarFeilet: false,
                isLoading: false,
            };
        }
        case ActionType.FAILED:
            return {
                ...state,
                saksbehandlere: {},
                tilsynHarFeilet: true,
                isLoading: false,
            };
        case ActionType.PENDING:
            return {
                ...state,
                saksbehandlere: {},
                tilsynHarFeilet: false,
                isLoading: true,
            };
        default:
            return { ...state };
    }
};

export default mainComponentReducer;
