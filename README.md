<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Campus Space - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            padding: 20px;
            background: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1, h2 {
            color: #007BFF;
        }

        ul, ol {
            margin: 20px 0;
            padding-left: 20px;
        }

        li {
            margin-bottom: 10px;
        }

        a {
            color: #007BFF;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        pre {
            background: #f8f8f8;
            padding: 10px;
            border-left: 3px solid #007BFF;
            overflow-x: auto;
        }

        code {
            background: #f1f1f1;
            padding: 2px 4px;
            font-size: 90%;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Campus Space</h1>
        <p><strong>Campus Space</strong> is a web application specifically designed for our college lecturers to streamline the process of booking auditoriums, labs, and seminar halls. It provides a user-friendly interface for faculty to manage campus resources efficiently.</p>

        <h2>Table of Contents</h2>
        <ul>
            <li><a href="#project-overview">Project Overview</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#technologies-used">Technologies Used</a></li>
            <li><a href="#installation">Installation</a></li>
            <li><a href="#usage">Usage</a></li>
            <li><a href="#contributing">Contributing</a></li>
            <li><a href="#license">License</a></li>
        </ul>

        <h2 id="project-overview">Project Overview</h2>
        <p>Campus Space is tailored to meet the needs of our college lecturers, offering a centralized system for booking and managing shared campus resources like auditoriums, labs, and seminar halls. The application allows lecturers to view available time slots, make bookings, and manage their reservations seamlessly.</p>

        <h2 id="features">Features</h2>
        <ul>
            <li><strong>Home Page:</strong> A welcoming landing page with easy navigation to the login page and other sections.</li>
            <li><strong>Login System:</strong> Lecturers log in with a college-specific username format (<code>CSE[number]</code>) and a common password.</li>
            <li><strong>Slot Booking:</strong> Facilitates the booking of available slots for labs, seminar halls, and auditoriums.</li>
            <li><strong>Check Booked Slots:</strong> Lecturers can view and manage their previously booked slots.</li>
            <li><strong>Responsive Design:</strong> The layout is optimized for different screen sizes using Bootstrap.</li>
            <li><strong>Toast Notifications:</strong> Provides real-time feedback on login success or failure.</li>
        </ul>

        <h2 id="technologies-used">Technologies Used</h2>
        <ul>
            <li><strong>Frontend:</strong> React.js, HTML, CSS, Bootstrap</li>
            <li><strong>Backend:</strong> Node.js, Express.js</li>
            <li><strong>Database:</strong> MongoDB</li>
            <li><strong>State Management:</strong> Context API, <code>react-hook-form</code></li>
            <li><strong>Styling:</strong> CSS, Bootstrap</li>
            <li><strong>Version Control:</strong> Git</li>
        </ul>

        <h2 id="installation">Installation</h2>
        <ol>
            <li><strong>Clone the repository:</strong>
                <pre><code>git clone https://github.com/your-username/campus-space.git</code></pre>
            </li>
            <li><strong>Navigate to the project directory:</strong>
                <pre><code>cd campus-space</code></pre>
            </li>
            <li><strong>Install dependencies for both client and server:</strong>
                <pre><code>npm install
cd client
npm install
cd ..</code></pre>
            </li>
            <li><strong>Start the development server:</strong>
                <pre><code>npm run dev</code></pre>
            </li>
        </ol>

        <h2 id="usage">Usage</h2>
        <ol>
            <li><strong>Login:</strong> Use a college-specific username in the format <code>CSE[number]</code> (e.g., <code>CSE101</code>) and the common password to log in.</li>
            <li><strong>Book Slots:</strong> Navigate to the Labs or Seminar Halls section to view available slots and book them.</li>
            <li><strong>View Bookings:</strong> Check your booked slots by clicking the 'Check Your Booked Slots' button in the header.</li>
            <li><strong>Logout:</strong> Use the 'Logout' button in the header to exit the application.</li>
        </ol>

        <h2 id="contributing">Contributing</h2>
        <p>This project is built to benefit our college lecturers, and contributions are welcome! If you have any ideas or features you want to implement, please open an issue or submit a pull request.</p>
        <ol>
            <li>Fork the repository.</li>
            <li>Create a new branch for your feature (<code>git checkout -b feature-name</code>).</li>
            <li>Commit your changes (<code>git commit -m 'Add feature'</code>).</li>
            <li>Push to the branch (<code>git push origin feature-name</code>).</li>
            <li>Open a pull request.</li>
        </ol>

        <h2 id="license">License</h2>
        <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
    </div>
</body>
</html>
