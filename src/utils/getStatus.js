export const getStatus = (allTasks) => {
  const validTasks = allTasks.filter((task) => task.status !== 'NA');
  const total = validTasks.length;
  let status = 0;
  validTasks.forEach((task) => {
    if (task.status === 'C') status++;
  });
  return parseFloat(status / total) * 100;
};
