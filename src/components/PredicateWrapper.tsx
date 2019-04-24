import React, { useState } from 'react';
import axios from 'axios';
import { PredicateBuilder } from './PredicateBuilder';

export interface ICondition {
    column: string;
    conditionType: string;
    condition1: string | number;
    condition2: string | number;
}

const defaultCondition: ICondition = {
    column: '',
    conditionType: '',
    condition1: '',
    condition2: ''
};



export const PredicateWrapper = () => {
    const [conditions, setConditions] = useState<ICondition[]>([defaultCondition])
    const [sql, setSql] = useState<string>('');
    const addCondition = () => {
        console.log(conditions, 'conditions');
        setConditions([...conditions, defaultCondition]);
    }
    const getSql = () => {
        axios.post('http://localhost:8080/api/getSql', {
            conditions
        }).then((res: any) => {
            console.log(res);
            setSql(res.body && res.body.sql);
        })
    }

    console.log(conditions);
    return (
        <>
            <div className="mt-1">
                {conditions.map((c, index) => {
                    return <PredicateBuilder key={`${c.column}${index}`} id={index} conditions={conditions} setConditions={setConditions} />
                })}
                <button onClick={addCondition} className="mt-2 bg-blue-quantum py-2 px-4 text-white w-24">And</button>
            </div>
            <div className="flex justify-end py-2">
                <button onClick={getSql} className="px-3 py-2 w-48 bg-blue-quantum rounded-sm text-white">Search</button>
            </div>
        </>
    )
}

