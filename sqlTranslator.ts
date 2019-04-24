type PredicateType = "string" | "number";

export const predicates: { [key: string]: Predicate; } = {
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

export const getSql = (conditions: any[]) => {
    let sql = "SELECT * FROM Session WHERE ";
    console.log(conditions);
    for (var i = 0; i < conditions.length; i++) {
        if (i > 0) sql += " AND ";
        sql += `${getWhereClause(conditions[i])}`
    }
    return sql;
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
    let whereClause = '';
    switch (conditionType) {
        case "greater than":
            whereClause += `${sqlColumn} > ${condition1}`; break;
        case "less than":
            whereClause += `${sqlColumn} < ${condition1}`; break;
        case "between":
            whereClause += `${sqlColumn} BETWEEN ${condition1} AND ${condition2}`; break;
        case "contains":
            whereClause += `${sqlColumn} like '%${condition1}%'`; break;
        case "starts with":
            whereClause += `${sqlColumn} like '${condition1}%'`; break;
        case "equals": {
            if (predicates[column].type === "string") con.condition1 = `'${condition1}'`;
            whereClause += `${sqlColumn} = '${condition1}'`;
            break;
        }
        case "in list": {
            let inClause;
            if (predicates[column].type === "string") {
                inClause = (condition1 as string).split(',').map(c => c = `'${c}'`).join(',');
            }
            whereClause += `${sqlColumn} IN (${inClause})`;
            break;
        }
    }
    return whereClause;
};

module.exports = {
    getSql
}
