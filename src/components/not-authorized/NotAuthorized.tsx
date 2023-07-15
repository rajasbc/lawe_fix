import classNames from 'classnames';
import * as React from 'react';
import { EmptyPage } from '../empty-page/EmptyPage';
import { AnimeComponent } from '../404/NotFound404';

export interface INotAuthorizedProps {
    className?: string;
}

export const NotAuthorized = (props: INotAuthorizedProps) => {

    return (
            <EmptyPage
                image={<AnimeComponent />}
                title="Unauthorized"
                desc="Sorry, You don't have the proper credentials to access this page."
            />
    );
};
