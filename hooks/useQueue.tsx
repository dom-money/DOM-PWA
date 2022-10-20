import { useState, useEffect } from 'react';

type useQueueParams = {
  maxCalls: number;
  timeWindow: number;
};

type QueueItem<T> = {
  id: string;
  asyncFn: () => Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

type PushType = <T>(asyncFn: () => Promise<T>, id: string) => Promise<T>;

const useQueue = ({ maxCalls, timeWindow }: useQueueParams) => {
  const [ queue, setQueue ] = useState<QueueItem<any>[]>([]);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ lastResponseTimestamp, setLastResponseTimestamp ] = useState(0);

  // The delay time between when last queue item's async function ...
  // .. got settled (response received) and calling async function ...
  // .. of the next queue item
  const delayTime = timeWindow / maxCalls;

  useEffect(() => {
    if (queue.length === 0) return;
    if (isProcessing) return;

    // On each queue state update next queue item will be processed ...
    // .. until the queue array is empty
    const processNextQueueItem = async () => {
      setIsProcessing(true);
      const firstQueueItem = queue[ 0 ];
      try {
        const data = await firstQueueItem.asyncFn();
        firstQueueItem.resolve(data);
      } catch (error) {
        firstQueueItem.reject(error);
      } finally {
        setLastResponseTimestamp(Date.now());
        setIsProcessing(false);
        setQueue((currentQueue) => [
          ...currentQueue.slice(1),
        ]);
      };
    };

    // Elapsed time since last async function got settled ...
    // .. (response received)
    const timeElapsed = Date.now() - lastResponseTimestamp;
    // If the specified delay time has passed - processing next queue item ...
    // .. without a delay
    if (timeElapsed > delayTime) {
      processNextQueueItem();
      return;
    };
    // Otherwise calculating the delay based on elapsed time ...
    // .. and processing next queue item with a delay
    const timeToWait = delayTime - timeElapsed;
    setTimeout(processNextQueueItem, timeToWait);
  }, [ queue ]);

  // Push queue item to queue
  const push: PushType = (asyncFn, id) => {
    return new Promise((resolve, reject) => {
      setQueue((currentQueue) => [
        ...currentQueue,
        {
          id,
          asyncFn,
          resolve,
          reject,
        },
      ]);
    });
  };

  // Remove queue item from queue based on the id
  const remove = (id: string) => {
    setQueue((currentQueue) =>
      currentQueue.filter((queueItem) => queueItem.id !== id),
    );
  };

  return { push, remove };
};

export default useQueue;
