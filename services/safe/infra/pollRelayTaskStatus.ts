import { GelatoRelayPack } from '@safe-global/relay-kit';

type TaskStatus =
  NonNullable<Awaited<ReturnType<GelatoRelayPack['getTaskStatus']>>>;

const pollRelayTaskStatus = async (
    taskId: string,
    relayAdapter: GelatoRelayPack,
    retryCount = 0,
): Promise<TaskStatus> => {
  const retry = (): Promise<TaskStatus> => new Promise((resolve, reject) => {
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

export default pollRelayTaskStatus;
