import { predicates } from "./components/PredicateBuilder";

export const getSql = (conditions: any[]) => {
    let sql = "SELECT * FROM Session Where";
    for (var i = 0; i < conditions.length; i++) {
        sql += `${getWhereClause(conditions[i])}`
    }
}

interface Condition {
    column: string;
    conditionType: string;
    condition1: string | number;
    condition2: string | number;
}

const getWhereClause = (condition: Condition) => {
    let whereClause = "AND ";
    switch (condition.conditionType) {
        case "greater than":
            whereClause += `${condition.column} > ${condition.condition1}`
        case "less than":
            whereClause += `${condition.column} < ${condition.condition1}`
        case "between":
            whereClause += `${condition.column} > ${condition.condition1} AND ${condition.column} < ${condition.condition2}`
        case "contains":
            whereClause += `${condition.column} like '%${condition.condition1}%'`;
        case "starts with":
            whereClause += `${condition.column} like '${condition.condition1}%'`;
        case "equals": {
            if (predicates[condition.column].type === "string") condition.condition1 = `'${condition.condition1}'`;
            whereClause += `${condition.column} like '${condition.condition1}%'`;
        }
        case "in list": {
            let inClause;
            if (predicates[condition.column].type === "string") {
                inClause = (condition.condition1 as string).split(',').map(c => c = `'${c}'`).join(',');
            }
            whereClause += `${condition.column} IN (${inClause})`;
        }
    }
};
