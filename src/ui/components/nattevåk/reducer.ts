import ActionType from './actionTypes';
import Vurderingsoversikt from '../../../types/Vurderingsoversikt';

interface NattevåkState {
    nattevåksperiodeoversikt: Vurderingsoversikt;
    nattevåksperiodeoversiktHarFeilet: boolean;
    isLoading: boolean;
}

interface Action {
    type: ActionType;
    nattevåksperiodeoversikt?: Vurderingsoversikt;
}

const nattevåkReducer = (state: NattevåkState, action: Action): Partial<NattevåkState> => {
    switch (action.type) {
        case ActionType.OK:
            return {
                nattevåksperiodeoversikt: action.nattevåksperiodeoversikt,
                nattevåksperiodeoversiktHarFeilet: false,
                isLoading: false,
            };
        case ActionType.FAILED:
            return {
                nattevåksperiodeoversikt: null,
                nattevåksperiodeoversiktHarFeilet: true,
                isLoading: false,
            };
        case ActionType.PENDING:
            return {
                nattevåksperiodeoversikt: null,
                nattevåksperiodeoversiktHarFeilet: false,
                isLoading: true,
            };
        default:
            return { ...state };
    }
};

export default nattevåkReducer;
