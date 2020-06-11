import Dexie from 'dexie';

const db = new Dexie('catDB');

db.version(1).stores({ 
  moods: '++id, mood, dateTime',
  settings: 'id, userName, moodOptions'
});

export default db;