import axios from 'axios';
import * as React from 'react';
import { NattevåksperiodeResponse } from '../../../types/NattevåksperiodeResponse';
import Vurderingsoversikt from '../../../types/Vurderingsoversikt';
import { get } from '../../../util/httpUtils';
import ContainerContext from '../../context/ContainerContext';
import PageContainer from '../page-container/PageContainer';
import ActionType from './actionTypes';
import Nattevåksperiodeoversikt from './nattevåksperiodeoversikt/Nattevåksperiodeoversikt';
import nattevåkReducer from './reducer';

const Nattevåk = () => {
    const { endpoints, httpErrorHandler } = React.useContext(ContainerContext);
    const [state, dispatch] = React.useReducer(nattevåkReducer, {
        isLoading: true,
        nattevåksperiodeoversiktHarFeilet: false,
        nattevåksperiodeoversikt: null,
    });

    const { nattevåksperiodeoversikt, isLoading, nattevåksperiodeoversiktHarFeilet } = state;

    const httpCanceler = React.useMemo(() => axios.CancelToken.source(), []);

    const getNattevåksperioder = () =>
        get<NattevåksperiodeResponse>(endpoints.nattevåk, httpErrorHandler, {
            cancelToken: httpCanceler.token,
        });

    const handleError = () => {
        dispatch({ type: ActionType.FAILED });
    };

    React.useEffect(() => {
        let isMounted = true;
        getNattevåksperioder()
            .then(({ nattevåksperioder }: NattevåksperiodeResponse) => {
                if (isMounted) {
                    const nyNattevåksperiodeoversikt = new Vurderingsoversikt(nattevåksperioder);
                    dispatch({ type: ActionType.OK, nattevåksperiodeoversikt: nyNattevåksperiodeoversikt });
                }
            })
            .catch(handleError);
        return () => {
            isMounted = false;
            httpCanceler.cancel();
        };
    }, []);

    return (
        <>
            <PageContainer isLoading={isLoading} hasError={nattevåksperiodeoversiktHarFeilet}>
                <Nattevåksperiodeoversikt nattevåksperiodeoversikt={nattevåksperiodeoversikt} />
            </PageContainer>
        </>
    );
};

export default Nattevåk;
