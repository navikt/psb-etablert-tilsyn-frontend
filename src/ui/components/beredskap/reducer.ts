import ActionType from './actionTypes';
import Vurderingsoversikt from '../../../types/Vurderingsoversikt';

interface BeredskapState {
    beredskapsperiodeoversikt: Vurderingsoversikt;
    beredskapsperiodeoversiktHarFeilet: boolean;
    isLoading: boolean;
}

interface Action {
    type: ActionType;
    beredskapsperiodeoversikt?: Vurderingsoversikt;
}

const beredskapReducer = (state: BeredskapState, action: Action): Partial<BeredskapState> => {
    switch (action.type) {
        case ActionType.OK:
            return {
                beredskapsperiodeoversikt: action.beredskapsperiodeoversikt,
                beredskapsperiodeoversiktHarFeilet: false,
                isLoading: false,
            };
        case ActionType.FAILED:
            return {
                beredskapsperiodeoversikt: null,
                beredskapsperiodeoversiktHarFeilet: true,
                isLoading: false,
            };
        case ActionType.PENDING:
            return {
                beredskapsperiodeoversikt: null,
                beredskapsperiodeoversiktHarFeilet: false,
                isLoading: true,
            };
        default:
            return { ...state };
    }
};

export default beredskapReducer;
