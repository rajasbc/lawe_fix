import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface ILoadingComponentProps {
    className?: string;
}

export const LoadingComponent = (props: ILoadingComponentProps) => {
    const className = classNames('mt-5', 'text-center','jumbotron', 'bg-white', props.className);

    return (
        <div className={className}>
           <CircularProgress disableShrink />
        </div>
    );
};
