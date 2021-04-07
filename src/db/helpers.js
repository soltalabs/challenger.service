export function getConnectionState({ readyState }) {
  return {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }[readyState]
}
