// notifications.js
import { writable } from 'svelte/store';

// クリックされたリンクのIDを管理するストア
export const visitedTeams = writable(new Set());
