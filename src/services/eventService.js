//import { db } from './firebase';
//import { collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';

const eventsCollection = collection(db, 'events');
const subscribersCollection = collection(db, 'subscribers');

// Fetch public approved events
export const getApprovedEvents = async () => {
  try {
    const q = query(eventsCollection, where('status', '==', 'approved'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching events: ", error);
    return [];
  }
};

// Fetch pending events for admin
export const getPendingEvents = async () => {
  try {
    const q = query(eventsCollection, where('status', '==', 'pending'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching pending events: ", error);
    return [];
  }
};

// Submit a new event suggestion
export const submitEventSuggestion = async (eventData) => {
  try {
    const docRef = await addDoc(eventsCollection, {
      ...eventData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding event: ", error);
    throw error;
  }
};

// Update event status (Admin only)
export const updateEventStatus = async (eventId, newStatus) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, { status: newStatus });
  } catch (error) {
    console.error("Error updating event status: ", error);
    throw error;
  }
};

// Subscribe to WhatsApp reminders
export const subscribeToWhatsApp = async (phoneNumber) => {
  try {
    const docRef = await addDoc(subscribersCollection, {
      phone: phoneNumber,
      subscribedAt: serverTimestamp(),
      active: true
    });
    return docRef.id;
  } catch (error) {
    console.error("Error subscribing to WhatsApp: ", error);
    throw error;
  }
};
