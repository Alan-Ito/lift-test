import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

console.log(import.meta.env.VITE_REVERB_APP_KEY);
console.log(import.meta.env.VITE_REVERB_HOST);
console.log(import.meta.env.VITE_REVERB_PORT);
console.log(import.meta.env.VITE_REVERB_SCHEME);

const echo = new Echo({
    broadcaster: 'reverb',
    key: 'test',
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

export default echo;
