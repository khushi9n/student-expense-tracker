# Student-Expense-Tracker
The Student Expense Tracker App likely allows students to track their expenses, categorize them, and possibly visualize spending over time. It might also include features for budgeting and alerts for when spending exceeds certain thresholds.

## Features

- Set and update budget
- Add and delete expenses
- Categorize expenses
- View expense reports
- Responsive design with a custom background

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/student-expense-tracker.git
   ```

2. Navigate to the project directory:
   ```
   cd student-expense-tracker
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Development Server

To start the development server, run:

```
npm start
```

This will launch the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

To create a production build, use:

```
npm run build
```

This command builds the app for production to the `build` folder, optimizing the build for the best performance.

## Deployment

The app is currently deployed on Netlify. To deploy updates:

1. Ensure you have the Netlify CLI installed:
   ```
   npm install -g netlify-cli
   ```

2. Authenticate with Netlify:
   ```
   netlify login
   ```

3. Deploy the app:
   ```
   netlify deploy --prod
   ```

   Use the following details when prompted:
   - Publish directory: `build`
   - Functions directory: Leave blank (press Enter)
   - Deploy without prompts in the future: Yes

Current deployment details:
- URL: https://subtle-daifuku-82781b.netlify.app
- Netlify Token: 6e1ef010498440ecad5a7b4de58fe326

## Customization

- The app uses a custom background image located at `public/student-expense-tracker/background.png`.
- The Parisienne font from Google Fonts is used for the app title and Expense List title.

## Technologies Used

- React
- Chakra UI
- Axios for API requests
- React Hooks for state management

## Contributing

Contributions to improve the Student Expense Tracker are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your-username/student-expense-tracker](https://github.com/your-username/student-expense-tracker)
