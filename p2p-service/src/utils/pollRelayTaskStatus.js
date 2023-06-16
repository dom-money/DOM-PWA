const pollRelayTaskStatus = async (taskId, relayAdapter, retryCount = 0) => {
  const retry = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      pollRelayTaskStatus(taskId, relayAdapter, retryCount + 1)
          .then(resolve)
          .catch(reject);
    }, 2000);
  });

  try {
    const taskStatus = await relayAdapter.getTaskStatus(taskId);

    if (!taskStatus) return retry();

    if (taskStatus.taskState === 'ExecSuccess') return taskStatus;

    if ([
      'ExecReverted',
      'Blacklisted',
      'Cancelled',
      'NotFound',
    ].includes(taskStatus.taskState)) {
      throw new Error(taskStatus.taskState);
    };

    if (retryCount >= 10) {
      throw new Error('Retry limit reached');
    }

    return retry();
  } catch (err) {
    return retry();
  }
};

module.exports = pollRelayTaskStatus;
