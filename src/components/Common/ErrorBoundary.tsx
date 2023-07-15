import * as React from 'react';

export interface ErrorBoundaryState {
    hasError: boolean;
    message?: string;
    children?:any;
}

export class ErrorBoundary extends React.Component<any,any,any> {

    constructor(props:any) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(e) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            message: e.message,
        };
    }

    componentDidCatch(e, info) {
        console.error(e);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="d-flex flex-column mt-5 align-items-center justify-content-center">
                    <h1>Something went wrong :(</h1>
                    <p>{this.state.message}</p>
                    <h5 className="m-3 ">Please refresh the page to Continue Working.</h5>
                </div>
            );
        }
        else{
        return this.props.children;
        }
    }
}
