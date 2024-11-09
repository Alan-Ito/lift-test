// notifications.js
import { writable } from 'svelte/store';

export const notifications = writable(0);

export const notification_list = writable([]);
