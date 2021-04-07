import axios from 'axios';
import * as React from 'react';
import BeredskapsperiodeoversiktType from '../../../types/BeredskapsperiodeoversiktType';
import { BeredskapsperiodeResponse } from '../../../types/BeredskapsperiodeResponse';
import { get } from '../../../util/httpUtils';
import ContainerContext from '../../context/ContainerContext';
import PageContainer from '../page-container/PageContainer';
import ActionType from './actionTypes';
import Beredskapsperiodeoversikt from './beredskapsperioderoversikt/Beredskapsperiodeoversikt';
import beredskapReducer from './reducer';

const Beredskap = () => {
    const { endpoints, httpErrorHandler } = React.useContext(ContainerContext);
    const [state, dispatch] = React.useReducer(beredskapReducer, {
        isLoading: true,
        beredskapsperiodeoversiktHarFeilet: false,
        beredskapsperiodeoversikt: null,
    });

    const { beredskapsperiodeoversikt, isLoading, beredskapsperiodeoversiktHarFeilet } = state;

    const httpCanceler = React.useMemo(() => axios.CancelToken.source(), []);

    const getBeredskapsperioder = () =>
        get<BeredskapsperiodeResponse>(endpoints.beredskap, httpErrorHandler, {
            cancelToken: httpCanceler.token,
        });

    const handleError = () => {
        dispatch({ type: ActionType.FAILED });
    };

    React.useEffect(() => {
        let isMounted = true;
        getBeredskapsperioder()
            .then(({ beredskapsperioder }: BeredskapsperiodeResponse) => {
                if (isMounted) {
                    const nyBeredskapsperiodeoversikt = new BeredskapsperiodeoversiktType(beredskapsperioder);
                    dispatch({ type: ActionType.OK, beredskapsperiodeoversikt: nyBeredskapsperiodeoversikt });
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
            <PageContainer isLoading={isLoading} hasError={beredskapsperiodeoversiktHarFeilet}>
                <Beredskapsperiodeoversikt beredskapsperiodeoversikt={beredskapsperiodeoversikt} />
            </PageContainer>
        </>
    );
};

export default Beredskap;
