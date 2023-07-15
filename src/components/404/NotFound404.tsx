import { EmptyPage } from '../empty-page/EmptyPage';

export interface INotFound404Props {
    className?: string;
}

export const NotFound404 = () => {
    return (
        <EmptyPage
            image={<AnimeComponent />}
            title="Page Not Found (404)"
            desc="Sorry, the page you are looking for cannot be found. The path to this content may have changed or it is currently unavailable."
        />
    );
};

export const AnimeComponent = () => {
    return (
        <div className="b-block">
            <div className="face jump">
                <div className="band">
                    <div className="red"></div>
                    <div className="white"></div>
                    <div className="blue"></div>
                </div>
                <div className="eyes"></div>
                <div className="dimples"></div>
                <div className="mouth"></div>
            </div>
        </div>
    );
};
