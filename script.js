// Variables to track task counts and states
let taskCount = 23; // Navbar task count
let taskAssignedCount = 6; // Task Assigned card count
let completedTasks = 0; // Counter to track completed tasks
const totalTasks = 6; // Total number of task cards

// DOM Elements
const taskCountElement = document.getElementById('taskCount');
const taskAssignedCountElement = document.getElementById('taskAssignedCount');
const colorChangeBtn = document.getElementById('colorChangeBtn');
const blogRedirectBtn = document.getElementById('blogRedirectBtn');
const currentDateElement = document.getElementById('currentDate');
const activityLogElement = document.getElementById('activityLog');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Task button IDs (updated to match HTML)
const taskButtons = [
    'shopEaseBtn',
    'cloudSyncBtn',
    'swiftPayBtn',
    'metaBtn',
    'googleLLCBtn',
    'glassdoorBtn'
];

// Function to get current date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

// Function to update current date in the card
function updateCurrentDate() {
    const now = new Date();
    currentDateElement.innerHTML = `
        <p class="text-gray-600 font-medium">${now.toLocaleDateString('en-US', { weekday: 'short' })}</p>
        <p class="text-[#00303C] font-semibold">${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
    `;
}
updateCurrentDate(); // Call on page load

// Function to generate random background color for the body
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Change background color on button click
colorChangeBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = getRandomColor();
});

// Redirect to blog page on "Discover Something New" click
blogRedirectBtn.addEventListener('click', () => {
    window.location.href = 'blog.html'; // Redirect to blog.html
});

// Handle task completion for each button
taskButtons.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
        console.log(`Button found: ${buttonId}`); // Check if button is found
        button.addEventListener('click', () => {
            if (!button.disabled) {
                button.disabled = true;
                button.classList.remove('bg-blue-500');
                button.classList.add('bg-gray-400', 'cursor-not-allowed');

                // Decrease task assigned count and update display
                taskAssignedCount--;
                taskAssignedCountElement.textContent = taskAssignedCount;

                // Increase navbar task count and update display
                taskCount++;
                taskCountElement.textContent = taskCount;

                // Increment completed tasks counter
                completedTasks++;

                // Get the correct task name based on the button ID
                let taskName;
                switch (buttonId) {
                    case 'shopEaseBtn':
                        taskName = 'Fix Mobile Button Issue';
                        break;
                    case 'cloudSyncBtn':
                        taskName = 'Add Dark Mode';
                        break;
                    case 'swiftPayBtn':
                        taskName = 'Optimize Home Page';
                        break;
                    case 'metaBtn':
                        taskName = 'Add New Emoji 🤲';
                        break;
                    case 'googleLLCBtn':
                        taskName = 'Integrate OpenAI API';
                        break;
                    case 'glassdoorBtn':
                        taskName = 'Improve Job Searching';
                        break;
                    default:
                        taskName = 'Unknown Task';
                }

                // Show "Board updated Successfully" alert
                alert('Board updated Successfully');

                // Create a new div for the activity log entry with indigo-50 background and smaller, non-bold text
                const activityEntry = document.createElement('div');
                activityEntry.classList.add('bg-indigo-50', 'p-2', 'rounded-lg', 'text-sm', 'font-light', 'text-gray-700');
                activityEntry.textContent = `You have completed the task "${taskName}" at ${getCurrentDateTime()}`;
                activityLogElement.appendChild(activityEntry);

                // Check if all tasks are completed
                if (taskAssignedCount === 0) {
                    alert('Congrats!!! You have completed all the current tasks. Keep it up!');
                }
            }
        });
    } else {
        console.log(`Button not found: ${buttonId}`);
    }
});

// Clear activity log
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        activityLogElement.innerHTML = ''; // Remove all activity log entries
        console.log('Activity log cleared');
    });
} else {
    console.log('Clear History button not found');
}