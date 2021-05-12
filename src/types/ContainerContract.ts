import { HttpErrorHandler } from './HttpErrorHandler';

interface ContainerContract {
    readOnly: boolean;
    endpoints: {
        tilsyn: string;
    };
    httpErrorHandler: HttpErrorHandler;
    onFinished: (someProp: any) => void;
}

export default ContainerContract;
