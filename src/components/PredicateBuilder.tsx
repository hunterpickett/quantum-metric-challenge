import React, { useState } from 'react';
import { PredicateDropdown } from './PredicateDropdown';
import { ComparorDropdown } from './ComparorDropdown';

type PredicateType = "string" | "number";

const predicates: { [key: string]: Predicate; } = {
    "User Email": { type: "string" },
    "Screen Width": { type: "number" },
    "Screen Height": { type: "number" },
    "# of Visits": { type: "number" },
    "First Name": { type: "string" },
    "Last Name": { type: "string" },
    "Page Response time (ms)": { type: "number" },
    "Domain": { type: "string" },
    "Page Path": { type: "string" }
};

interface Predicate {
    type: PredicateType
}

interface IProps {

}

interface IState {
    selectedPredicate: string;
    selectedComparor: string;
}

export class PredicateBuilder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedPredicate: 'User Email',
            selectedComparor: ''
        }
    }

    handlePredicateChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (!e.currentTarget.value) return;
        this.setState({ selectedPredicate: e.currentTarget.value })
    }

    handleComparorChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (!e.currentTarget.value) return;
        this.setState({ selectedComparor: e.currentTarget.value })
    }

    render() {
        const { selectedPredicate, selectedComparor } = this.state;
        return (
            <>
                <PredicateDropdown selectedPredicate={selectedPredicate} handlePredicateChange={this.handlePredicateChange} />
                <ComparorDropdown selectedComparor={selectedComparor} handleComparorChange={this.handleComparorChange} comparorType={predicates[selectedPredicate].type} />
            </>
        )
    }
}





