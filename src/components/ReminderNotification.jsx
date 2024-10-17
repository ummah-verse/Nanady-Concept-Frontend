import { useEffect, useState } from 'react';
import { Toast } from 'flowbite-react';

// ReminderNotification.js
const ReminderNotification = () => {
  const [toastMessage, setToastMessage] = useState(null);

  // Function to fetch reminders from the API
  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/my-reminder`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        storeReminders(data.data); // Store fetched reminders in localStorage
      } else {
        throw new Error('Failed to fetch reminders');
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  // Function to store reminders in localStorage
  const storeReminders = (reminders) => {
    const storedReminders = reminders.map((reminder) => ({
      id: reminder.id,
      title: reminder.title,
      started_date: new Date(reminder.started_date).getTime(), // Convert to timestamp for easy comparison
      is_shown: false, // Default to false
    }));

    localStorage.setItem('reminders', JSON.stringify(storedReminders));
  };

  // Function to check notifications from localStorage
  const checkNotifications = () => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const now = new Date().getTime();

    storedReminders.forEach((reminder) => {
      // Check if the current time is equal to the reminder's started_date and not shown yet
      if (!reminder.is_shown && reminder.started_date <= now && reminder.started_date > now - 1000) {
        // Notify the user
        setToastMessage(`Reminder "${reminder.title}" has started!`);

        // Mark as shown in localStorage
        reminder.is_shown = true; // Update to true
      }
    });

    // Update localStorage with modified reminders
    localStorage.setItem('reminders', JSON.stringify(storedReminders));
  };

  // UseEffect to fetch reminders when the component mounts
  useEffect(() => {
    fetchReminders(); // Fetch reminders when the component mounts
  }, []);

  // Close toast message
  const closeToast = () => {
    setToastMessage(null);
  };

  // Check for reminders every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkNotifications(); // Check notifications from localStorage
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      {/* Render the toast message */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 custom-toast">
          <Toast className={`bg-neutral-600 text-neutral-200`}>
            <div className="inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-white">
              ❕
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <button
              onClick={closeToast}
              className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8"
            >
              <span className="sr-only">Close</span>
              ✖️
            </button>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default ReminderNotification;
