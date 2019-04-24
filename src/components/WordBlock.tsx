import React from 'react';

interface IProps {
    className?: string;
    word: string;
}

const WordBlock: React.SFC<IProps> = props => {
    const { className, word } = props;
    return (
        <span className={` ${className} py-2 px-4 bg-blue-lightest text-blue-darker lowercase border border-grey-light`}>
            {word}
        </span>
    )
};

export default WordBlock;