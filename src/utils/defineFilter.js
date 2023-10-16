export const defineFilter = (filter) => {
  const filters = {
    Done: { where: { isDone: true } },
    Undone: { where: { isDone: false } },
    firstOld: {
      where: {},
      order: [['date'], ['time'], ['id']],
    },
    Today: {
      where: { date: new Date().toLocaleDateString() },
      order: [
        ['time', 'DESC'],
        ['id', 'DESC'],
      ],
    },
  };

  return (
    filters[filter] ?? {
      where: {},
      order: [
        ['date', 'DESC'],
        ['time', 'DESC'],
        ['id', 'DESC'],
      ],
    }
  );
};
