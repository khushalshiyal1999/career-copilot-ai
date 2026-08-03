/** Central registry of BullMQ queue names. */
export const QUEUES = {
  AUTOMATION: 'automation',
  NOTIFICATIONS: 'notifications',
  AI: 'ai',
} as const;

export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];
