import type { Meta } from "@storybook/react";
import { DatePicker } from "./index";
import { useState } from "react";
import { DatePickerPresets } from "./utils";

const meta = {
  title: "Custom/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A modern, flexible date range picker component with a trigger button and dropdown. Supports both manual date selection and preset ranges.

## Key Features

- Dual-calendar view for intuitive date range selection
- Quick preset date ranges (Today, Yesterday, Last Week, etc.)
- Maximum range limit of 3 months
- Smooth animations and transitions
- Responsive dropdown positioning
- Click outside to close

## Integration Guide

### Installation

Install the required dependencies:

\`\`\`bash
npm install dayjs
# or
yarn add dayjs
\`\`\`

### Plugin Setup

Add these plugins to your main application entry point (e.g., \`main.tsx\` or \`App.tsx\`):

\`\`\`typescript
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
\`\`\`

### Required Plugins

The following plugins are essential for proper functionality:

#### 1. UTC Plugin

Required for UTC conversions and time standardization:

\`\`\`typescript
// Example Usage
const utcDate = dayjs().utc();                    // Convert to UTC
const localDate = utcDate.local();                // Convert back to local
const isoString = dayjs().utc().toISOString();    // "2025-01-15T18:27:05Z"

// Common Issues Without Plugin
// ---------------------------
// - No UTC conversion: dayjs(...).utc is not a function
// - Inconsistent API interactions
// - Failed timezone comparisons
\`\`\`

#### 2. Timezone Plugin

Required for timezone operations and DST handling:

\`\`\`typescript
// Example Usage
const indiaTime = dayjs().tz('Asia/Kolkata');     // "2025-01-15 23:57:05"
const nyTime = dayjs().tz('America/New_York');    // "2025-01-15 13:27:05"
const isDST = dayjs().tz('America/New_York').isDST();

// Common Issues Without Plugin
// ---------------------------
// - No timezone support: dayjs.tz is not a function
// - Server/client time mismatches
// - Incorrect DST handling
\`\`\`

#### 3. Localized Format Plugin

Required for human-readable date formatting:

\`\`\`typescript
// Example Usage
const date1 = dayjs().format('L');     // "01/15/2025"
const date2 = dayjs().format('LL');    // "January 15, 2025"
const date3 = dayjs().format('LLLL');  // "Wednesday, January 15, 2025 11:57 PM"

// Common Issues Without Plugin
// ---------------------------
// - No shorthand formats
// - Limited formatting options
// - Invalid format string errors
\`\`\`

#### 4. Custom Parse Format Plugin

Required for parsing custom date formats:

\`\`\`typescript
// Example Usage
const date1 = dayjs('2025-01-15 23:57', 'YYYY-MM-DD HH:mm');
const date2 = dayjs('15/01/2025', 'DD/MM/YYYY');
const date3 = dayjs().format('DD/MM/YYYY HH:mm');

// Common Issues Without Plugin
// ---------------------------
// - Limited parsing capabilities
// - Invalid date errors
// - Inconsistent handling
\`\`\`

> **Pro Tip**: Always import and extend all plugins at your app's entry point.

### Timezone Configuration

Set your application's default timezone:

\`\`\`typescript
// Set default timezone (do this once in your app)
dayjs.tz.setDefault('Asia/Kolkata');  // Or your preferred timezone
\`\`\`

### Common Timezone Issues

#### 1. Display Inconsistencies
- Different dates appearing across timezones
- Time mismatches in UI (e.g., "2PM IST" showing as "11AM PST")
- Date boundaries shifting unexpectedly
- Weekend calculations varying by region

\`\`\`typescript
// Incorrect: Using local time
const localTime = dayjs().format('YYYY-MM-DD HH:mm');  // Varies by user's timezone

// Correct: Using specified timezone
const istTime = dayjs().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm');  // "2025-01-15 23:59"
\`\`\`

#### 2. Data Synchronization
- Server/client time mismatches
- Report data spanning wrong dates
- Analytics showing incorrect time periods
- Event scheduling conflicts

\`\`\`typescript
// Incorrect: No timezone consideration
const startOfDay = dayjs().startOf('day');                    // Varies by system
const endOfDay = dayjs().endOf('day');                       // Varies by system

// Correct: Timezone-aware calculations
const startOfDayIST = dayjs().tz('Asia/Kolkata').startOf('day');  // "2025-01-15 00:00:00"
const endOfDayIST = dayjs().tz('Asia/Kolkata').endOf('day');      // "2025-01-15 23:59:59"
\`\`\`

#### 3. API Integration
- Inconsistent date formats in requests/responses
- UTC conversion errors
- Timestamp parsing failures
- DST transition bugs

\`\`\`typescript
// Incorrect: Implicit timezone handling
const apiDate = dayjs().format();                            // Timezone not specified
const parsedDate = dayjs(responseDate);                      // Assumes local timezone

// Correct: Explicit timezone handling
const apiDateIST = dayjs().tz('Asia/Kolkata').format();      // With timezone
const parsedDateIST = dayjs(responseDate).tz('Asia/Kolkata'); // Parse with timezone
\`\`\`

#### 4. Global User Experience
- Calendar widgets showing wrong dates
- Meeting schedulers with timezone confusion
- Date pickers with inconsistent ranges
- Notification timing issues

\`\`\`typescript
// Incorrect: Local-only date handling
const meeting = {
  start: dayjs().add(1, 'day').format(),           // Local timezone
  end: dayjs().add(1, 'day').add(1, 'hour').format() // Local timezone
};

// Correct: Global-friendly date handling
const meetingGlobal = {
  start: dayjs().tz('Asia/Kolkata').add(1, 'day').format(),           // IST
  end: dayjs().tz('Asia/Kolkata').add(1, 'day').add(1, 'hour').format() // IST
};
\`\`\`


## Implementation Example

\`\`\`typescript
import { DatePicker, DatePickerPresets } from "@/components/custom/DateRangePicker";

interface DateRange {
  start: string | null;
  end: string | null;
  preset: DatePickerPresets;
}

const YourComponent = () => {
  // Initialize with today's date range
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    dayjs().startOf('day').toDate(),
    dayjs().endOf('day').toDate()
  ]);
  
  const [preset, setPreset] = useState(DatePickerPresets.today);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (dates: DateRange) => {
    const apiPayload = {
      dateRange: {
        start: dates.start,    // "2025-01-15T00:00:00Z"
        end: dates.end,        // "2025-01-15T23:59:59Z"
      },
      preset: dates.preset     // DatePickerPresets.today
    };
    
    console.log('Ready for API:', apiPayload);
    // await api.post('/save-date-range', apiPayload);
  };

  return (
    <DatePicker
      startDate={dateRange[0]}
      endDate={dateRange[1]}
      onChange={handleDateChange}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selectedPreset={preset}
      className="rounded-lg p-4 shadow-sm bg-white bg-opacity-10 backdrop-blur-lg"
      onCancel={() => {
        setIsOpen(false);
      }}
      onSave={(dates) => {
        console.log("Saved date range:", {
          startDate: dates.start,
          endDate: dates.end,
          preset: dates.preset,
        });
        setIsOpen(false);
      }}
    />
  );
};
\`\`\`

## Component Props

\`\`\`typescript
interface DateRangePickerProps {
  /** Start date of the range */
  startDate: Date | null;
  
  /** End date of the range */
  endDate: Date | null;
  
  /** Callback when dates change */
  onChange: (dates: [Date | null, Date | null]) => void;
  
  /** Currently selected preset */
  selectedPreset: DatePickerPresets;
  
  /** Optional CSS classes */
  className?: string;
  
  /** Callback when selection is cancelled */
  onCancel?: () => void;
  
  /** Callback when selection is saved */
  onSave?: (dates: DateRange) => void;
}
\`\`\`

## Available Presets

\`\`\`typescript
enum DatePickerPresets {
  today = 'today',             // Current day (00:00 to 23:59)
  yesterday = 'yesterday',     // Previous day
  lastWeek = 'lastWeek',       // Last 7 days
  lastMonth = 'lastMonth',     // Last 30 days
  lastThreeMonths = 'lastThreeMonths', // Last 90 days
  custom = 'custom'            // User-defined range
}
\`\`\`

`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-start gap-4">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;

const DefaultDatePicker = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(), // Current date
    new Date(2024, 11, 25), // January 15, 2025
  ]);
  const [preset, setPreset] = useState<DatePickerPresets>(
    DatePickerPresets.lastWeek,
  );
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    setPreset(DatePickerPresets.custom);
  };

  return (
    <div className="w-full flex justify-end">
      <DatePicker
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={handleDateChange}
        selectedPreset={preset}
        className="rounded-lg p-4 shadow-sm bg-white bg-opacity-10 backdrop-blur-lg"
        onSave={(dates) => {
          alert("Saved date range: " + JSON.stringify(dates));
          console.log("Saved date range:", {
            startDate: dates.start,
            endDate: dates.end,
            preset: dates.preset,
          });
        }}
      />
    </div>
  );
};

export const Default = {
  render: () => <DefaultDatePicker />,
};
