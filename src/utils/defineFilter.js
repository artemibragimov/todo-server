export const defineFilter = (filter) => {
  const filters = {
    Done: { where: { isDone: true } },
    Undone: { where: { isDone: false } },
    firstOld: {
      order: [['date'], ['time'], ['id']],
    },
    Today: {
      where: { date: new Date().toLocaleDateString() },
      order: [['time'], ['id']],
    },
  };

  return (
    filters[filter] ?? {
      order: [
        ['date', 'DESC'],
        ['time', 'DESC'],
        ['id', 'DESC'],
      ],
    }
  );
};
