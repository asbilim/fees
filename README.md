# Withdrawal Fee Calculator

## Overview

The Withdrawal Fee Calculator is a Next.js web application designed to help users calculate withdrawal fees for mobile money services in Africa, specifically for Orange and MTN operators. This tool allows users to input their account balance, choose an operator, and calculate either a specific withdrawal amount or the maximum possible withdrawal while maintaining a minimum balance.

## Features

- Select between Orange and MTN operators
- Input account balance
- Choose between specific withdrawal amount or maximum possible withdrawal
- Calculate withdrawal fees based on operator rates
- Display transaction results including withdrawal amount, fees, total deduction, and remaining balance

## Technologies Used

- Next.js
- React
- shadcn/ui components
- Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/fees.git
   ```

2. Navigate to the project directory:

   ```
   cd fees
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Install shadcn/ui components (if not already included):
   ```
   npx shadcn@latest init
   ```
   Follow the prompts to set up shadcn/ui in your project.

## Running the Application

1. Start the development server:

   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Select your operator (Orange or MTN) from the dropdown menu.
2. Enter your account balance in the input field.
3. Choose whether you want to withdraw a specific amount or the maximum possible amount.
4. If you chose a specific amount, enter the amount you wish to withdraw.
5. Click the "Calculate" button to see the results.
6. The results will display the withdrawal amount, fees, total deduction, and remaining balance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions, feel free to reach out to [Your Name] at [admin@devsplug.com].
