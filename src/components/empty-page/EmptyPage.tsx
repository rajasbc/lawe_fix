
import * as React from 'react';
import  classNames from 'classnames';

export interface IEmptyPageProps {
    children?: any;
    background?: boolean;
    showHeader?: boolean;
    image?: React.ReactElement<any>;
    title?: any;
    desc?: any;
    className?: string;
}

export const EmptyPage = (props: IEmptyPageProps) => {
    const {
        background: background = false,
        showHeader: showHeader = false,
        image: image = null,
        title: title = null,
        desc: desc = null,
    } = props;

    const rootclassNames = classNames(
        'empty-state',
        props.className
    );

    return (
        <div className={rootclassNames}>
            <div className="text-center">
                {image}
                {title ? <p className="display-3">{title}</p> : null}
                {desc ? <p>{desc}</p> : null}
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
