import ActionType from './actionTypes';
import BeredskapsperiodeoversiktType from '../../../types/BeredskapsperiodeoversiktType';

interface MainComponentState {
    beredskapsperiodeoversikt: BeredskapsperiodeoversiktType;
    beredskapsperiodeoversiktHarFeilet: boolean;
    isLoading: boolean;
}

interface Action {
    type: ActionType;
    beredskapsperiodeoversikt?: BeredskapsperiodeoversiktType;
}

const beredskapReducer = (state: MainComponentState, action: Action): Partial<MainComponentState> => {
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
