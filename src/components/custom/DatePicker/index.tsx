import { DateRange, RangeKeyDict } from "react-date-range";
import dayjs from "dayjs";
import Button from "@/components/Atoms/Controls/Button";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar } from "react-icons/fi";
import { DatePickerPresets, presetsToDateRange } from "./utils";

export interface DatePickerProps {
  /**
   * The start date of the date range
   */
  startDate: Date | null;
  /**
   * The end date of the date range
   */
  endDate: Date | null;
  /**
   * Callback function that is called when the date range changes
   */
  onChange: (dates: [Date | null, Date | null]) => void;
  /**
   * Currently selected preset
   */
  selectedPreset: DatePickerPresets;
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
  /**
   * Optional callback function that is called when the cancel button is clicked
   */
  onCancel?: () => void;
  /**
   * Optional callback function that is called when the save button is clicked
   */
  onSave?: (dates: {
    start: string | null;
    end: string | null;
    preset: DatePickerPresets;
  }) => void;

  /**
   * Controls the open/closed state of the date picker
   */
  isOpen: boolean;

  /**
   * Callback when open state changes
   */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * DateRangePicker is a component that allows users to select a date range.
 * It supports both manual date selection and preset ranges like Today, Yesterday, Last Week, etc.
 */
const DateRangePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  onChange,
  selectedPreset,
  className,
  onCancel,
  onSave,
  isOpen,
}) => {
  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    const start = dayjs(selection.startDate);
    const end = dayjs(selection.endDate);

    if (end.diff(start, "months") > 3) {
      return;
    }

    onChange([selection.startDate || null, selection.endDate || null]);
  };

  const handlePresetChange = (preset: DatePickerPresets) => {
    const [presetStart, presetEnd] = presetsToDateRange(preset);
    onChange([presetStart, presetEnd]);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col flex-grow gap-4 overflow-hidden w-80">
          <DateRange
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[
              {
                startDate: startDate || new Date(),
                endDate: endDate || new Date(),
                key: "selection",
              },
            ]}
            direction="horizontal"
            preventSnapRefocus={true}
            dateDisplayFormat="dd.MM.yyyy"
            editableDateInputs={true}
            maxDate={new Date()}
          />
        </div>
        <div className="flex flex-col px-8 gap-5">
          <h5 className="font-medium text-white">Presets</h5>
          {Object.values(DatePickerPresets)
            .filter((preset) => preset !== DatePickerPresets.custom)
            .map((preset) => (
              <div
                key={preset}
                className={`cursor-pointer text-sm ${
                  preset === selectedPreset
                    ? "text-primary-500"
                    : "text-white/50 hover:text-white/70"
                }`}
                onClick={() => handlePresetChange(preset)}
              >
                {preset}
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4 mr-4">
        {onCancel && (
          <Button className="w-[200px]" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onSave && (
          <Button
            className="w-[200px]"
            onClick={() => {
              // Pass the current date range to onSave
              if (onSave) {
                const formattedStartDate = startDate
                  ? dayjs(startDate).format()
                  : null;
                const formattedEndDate = endDate
                  ? dayjs(endDate).format()
                  : null;
                onSave({
                  start: formattedStartDate,
                  end: formattedEndDate,
                  preset: selectedPreset,
                });
                console.log("Selected Date Range:", {
                  start: formattedStartDate,
                  end: formattedEndDate,
                  preset: selectedPreset,
                });
              }
            }}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * DatePicker is a component that allows users to select a date range.
 * It supports both manual date selection and preset ranges like Today, Yesterday, Last Week, etc.
 */
export const DatePicker: React.FC<
  Omit<DatePickerProps, "isOpen" | "setIsOpen">
> = (props) => {
  const [selectedPreset, setSelectedPreset] = useState(props.selectedPreset);
  const { startDate, endDate } = props;
  const triggerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={triggerRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-fit flex items-center gap-2 bg-white bg-opacity-10"
      >
        <FiCalendar className="w-4 h-4" />
        <span>
          {startDate && endDate
            ? `${dayjs(startDate).format("MMM DD")} - ${dayjs(endDate).format(
                "MMM DD, YYYY",
              )}`
            : "Select Date Range"}
        </span>
      </Button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.1,
              type: "keyframes",
            }}
            className="absolute z-[1000] mt-2 rounded-lg bg-background-900 shadow-lg right-0"
          >
            <DateRangePicker
              {...props}
              selectedPreset={selectedPreset}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onCancel={() => {
                if (props.onCancel) props.onCancel();
                setIsOpen(false);
              }}
              onSave={(dates) => {
                if (props.onSave) {
                  props.onSave(dates);
                }
                setIsOpen(false);
              }}
              onChange={(dates) => {
                props.onChange(dates);
                const [start, end] = dates;
                const preset = Object.values(DatePickerPresets).find(
                  (preset) => {
                    const [presetStart, presetEnd] = presetsToDateRange(preset);
                    return (
                      dayjs(start).isSame(presetStart, "day") &&
                      dayjs(end).isSame(presetEnd, "day")
                    );
                  },
                );
                setSelectedPreset(preset || DatePickerPresets.custom);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
