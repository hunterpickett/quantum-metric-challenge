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

const getWhereClause = (con: Condition) => {
    const { column, conditionType, condition1, condition2 } = con;
    let whereClause = "AND ";
    switch (conditionType) {
        case "greater than":
            whereClause += `${column} > ${condition1}`
        case "less than":
            whereClause += `${column} < ${condition1}`
        case "between":
            whereClause += `${column} > ${condition1} AND ${column} < ${condition2}`
        case "contains":
            whereClause += `${column} like '%${condition1}%'`;
        case "starts with":
            whereClause += `${column} like '${condition1}%'`;
        case "equals": {
            if (predicates[column].type === "string") con.condition1 = `'${condition1}'`;
            whereClause += `${column} like '${condition1}%'`;
        }
        case "in list": {
            let inClause;
            if (predicates[column].type === "string") {
                inClause = (condition1 as string).split(',').map(c => c = `'${c}'`).join(',');
            }
            whereClause += `${column} IN (${inClause})`;
        }
            return whereClause;
    }
};
