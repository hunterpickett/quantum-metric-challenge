type PredicateType = 'string' | 'number';

export const predicates: { [key: string]: Predicate } = {
  'User Email': { type: 'string' },
  'Screen Width': { type: 'number' },
  'Screen Height': { type: 'number' },
  '# of Visits': { type: 'number' },
  'First Name': { type: 'string' },
  'Last Name': { type: 'string' },
  'Page Response time (ms)': { type: 'number' },
  Domain: { type: 'string' },
  'Page Path': { type: 'string' }
};

interface Predicate {
  type: PredicateType;
}

export const getSql = (conditions: any[]) => {
  let sql = 'SELECT * FROM Session WHERE ';
  conditions = conditions.filter(c => c.condition1 !== '');
  for (var i = 0; i < conditions.length; i++) {
    if (i > 0) sql += ' AND ';
    sql += `${getWhereClause(conditions[i])}`;
  }
  return sql;
};

interface ICondition {
  column: string;
  comparor: string;
  condition1: string | number;
  condition2: string | number;
}

const columnMap: { [key: string]: string } = {
  'User Email': 'user_email',
  'Screen Width': 'screen_width',
  'Screen Height': 'screen_height',
  '# of Visits': 'visits',
  'First Name': 'user_first_name',
  'Last Name': 'user_last_name',
  'Page Response time (ms)': 'page_response',
  Domain: 'domain',
  'Page Path': 'path'
};

const getWhereClause = ({ column, comparor, condition1, condition2 }: ICondition) => {
  let sqlColumn = columnMap[column];
  switch (comparor) {
    case 'greater than':
      return `${sqlColumn} > ${condition1}`;
    case 'less than':
      return `${sqlColumn} < ${condition1}`;
    case 'between':
      return `${sqlColumn} BETWEEN ${condition1} AND ${condition2}`;
    case 'contains':
      return `${sqlColumn} like '%${condition1}%'`;
    case 'starts with':
      return `${sqlColumn} like '${condition1}%'`;
    case 'equals': {
      const displayVal = predicates[column].type === 'string' ? `'${condition1}'` : condition1;
      return `${sqlColumn} = ${displayVal}`;
    }
    case 'in list': {
      let inClause = condition1;
      if (predicates[column].type === 'string') {
        inClause = (condition1 as string)
          .split(',')
          .map(c => (c = `'${c}'`))
          .join(',');
      }
      return `${sqlColumn} IN (${inClause})`;
    }
  }
};

module.exports = {
  getSql
};
