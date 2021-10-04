const transformArray = (data: any, key = 'id') => {
  let all = {};
  const byIds: any = [];

  all = data.reduce((agg: any, curr: any) => {
    const aggregate = { ...agg };
    byIds.push(curr[key]);
    aggregate[curr[key]] = curr;
    return aggregate;
  }, all);

  return {
    all,
    byIds,
  };
};

export default transformArray;
