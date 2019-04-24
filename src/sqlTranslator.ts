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

const columnMap: { [key: string]: string } = {
    "User Email": "user_email",
    "Screen Width": "screen_width",
    "Screen Height": "screen_height",
    "# of Visits": "visits",
    "First Name": "user_first_name",
    "Last Name": "user_last_name",
    "Page Response time (ms)": "page_response",
    "Domain": "domain",
    "Page Path": "path"
}

const getWhereClause = (con: Condition) => {
    const { column, conditionType, condition1, condition2 } = con;
    let sqlColumn = columnMap[column];
    let whereClause = "AND ";
    switch (conditionType) {
        case "greater than":
            whereClause += `${sqlColumn} > ${condition1}`
        case "less than":
            whereClause += `${sqlColumn} < ${condition1}`
        case "between":
            whereClause += `${sqlColumn} > ${condition1} AND ${sqlColumn} < ${condition2}`
        case "contains":
            whereClause += `${sqlColumn} like '%${condition1}%'`;
        case "starts with":
            whereClause += `${sqlColumn} like '${condition1}%'`;
        case "equals": {
            if (predicates[column].type === "string") con.condition1 = `'${condition1}'`;
            whereClause += `${sqlColumn} like '${condition1}%'`;
        }
        case "in list": {
            let inClause;
            if (predicates[column].type === "string") {
                inClause = (condition1 as string).split(',').map(c => c = `'${c}'`).join(',');
            }
            whereClause += `${sqlColumn} IN (${inClause})`;
        }
            return whereClause;
    }
};
