import * as React from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
}

const AppContainer = (props: Props) => {
    const {
        title,
        children
    } = props;
    return (
        <div id="AppContainer">
            <p> header </p>
            <h1>{title}</h1>
            <div className="body">
                {children}
            </div>
            <p> Footer (tm)</p>
        </div>
    );
};


export default AppContainer;
