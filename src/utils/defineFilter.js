export const defineFilter = (filter) => {
  const filters = {
    Done: { where: { isDone: true } },
    Undone: { where: { isDone: false } },
    firstOld: {
      order: [
        ['date', 'DESC'],
        ['time', 'DESC'],
      ],
    },
    Today: {
      where: { date: new Date().toLocaleDateString() },
      order: [['time']],
    },
  };

  return (
    filters[filter] ?? {
      order: [['date'], ['time']],
    }
  );
};
