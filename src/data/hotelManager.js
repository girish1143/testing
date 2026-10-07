import { HOTEL_INFO, HOTEL_ROOMS } from './hotelRooms';

const INFO_STORAGE_KEY = 'aurelia_hotel_info';
const ROOMS_STORAGE_KEY = 'aurelia_hotel_rooms';

// Get current hotel information (persisted in localStorage or default fallback)
export function getStoredHotelInfo() {
  try {
    const raw = localStorage.getItem(INFO_STORAGE_KEY);
    if (raw) return { ...HOTEL_INFO, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('Error reading hotel info from localStorage:', err);
  }
  return { ...HOTEL_INFO };
}

// Save updated hotel information
export function saveHotelInfo(updatedInfo) {
  try {
    localStorage.setItem(INFO_STORAGE_KEY, JSON.stringify(updatedInfo));
  } catch (err) {
    console.error('Error saving hotel info to localStorage:', err);
  }
  return updatedInfo;
}

// Get current rooms list (persisted in localStorage or default fallback)
export function getStoredRooms() {
  try {
    const raw = localStorage.getItem(ROOMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading rooms from localStorage:', err);
  }
  return [...HOTEL_ROOMS];
}

// Save rooms list
export function saveRooms(roomsList) {
  try {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(roomsList));
  } catch (err) {
    console.error('Error saving rooms to localStorage:', err);
  }
  return roomsList;
}

// Reset all hotel data and rooms back to factory defaults
export function resetHotelData() {
  try {
    localStorage.removeItem(INFO_STORAGE_KEY);
    localStorage.removeItem(ROOMS_STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting hotel data:', err);
  }
  return {
    info: { ...HOTEL_INFO },
    rooms: [...HOTEL_ROOMS]
  };
}
