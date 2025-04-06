import { Meta, StoryObj } from "@storybook/react";
import ChatbotWidget from "./index";

const meta: Meta<typeof ChatbotWidget> = {
  title: "Custom/ChatbotWidget",
  component: ChatbotWidget,
  tags: ["autodocs"],
  argTypes: {
    botName: { control: "text" },
    welcomeMessage: { control: "text" },
    inputPlaceholder: { control: "text" },
    initiallyOpen: { control: "boolean" },
    onSendMessage: { action: "message sent" },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A floating, toggleable chatbot widget that can be added to any page for quick customer support. The widget is designed to be non-intrusive while allowing users to get help when needed.

## Features

- Floating button that expands into a chat interface
- Customizable theme color, bot name, and welcome message
- Real-time conversation interface
- Typing indicators
- Support for handling custom responses through callbacks
- Fully responsive design
- Animated transitions using Framer Motion
- Accessibility features

## Usage

\`\`\`jsx
import ChatbotWidget from '@/components/ChatbotWidget';

// Basic usage
const MyPage = () => {
  return (
    <div>
      <h1>My Page Content</h1>
      
      {/* Add the chatbot widget */}
      <ChatbotWidget 
        botName="Support Assistant"
        welcomeMessage="Hello! How can I assist you today?"
        themeColor="#4FB7DD"
        onSendMessage={async (message) => {
          // Process message and return response
          return "This is a response to: " + message;
        }}
      />
    </div>
  );
};
\`\`\`

## Integration with APIs

The widget can be integrated with any API by using the \`onSendMessage\` prop:

\`\`\`jsx
<ChatbotWidget
  onSendMessage={async (message) => {
    try {
      // Call your API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  }}
/>
\`\`\`

## Accessibility

The widget includes the following accessibility features:
- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader-friendly messages
- Semantic HTML structure

## Responsiveness

The chatbot widget is fully responsive and works well on all device sizes:

- On mobile devices, the chat window takes up more of the available screen space
- On desktop, the widget remains compact and non-intrusive
- All text and controls are sized appropriately for touch input
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatbotWidget>;

// Define a message handler that simulates API response
const mockMessageHandler = async (message: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    message.toLowerCase().includes("hello") ||
    message.toLowerCase().includes("hi")
  ) {
    return "Hello! How can I help you today?";
  }

  if (message.toLowerCase().includes("help")) {
    return "I can help with product information, troubleshooting, and general questions. What do you need help with?";
  }

  if (message.toLowerCase().includes("thank")) {
    return "You're welcome! Is there anything else I can help with?";
  }

  return "I'm not sure I understand. Could you please rephrase your question?";
};

export const Default: Story = {
  args: {
    botName: "Support Bot",
    welcomeMessage: "Hello! 👋 How can I help you today?",
    inputPlaceholder: "Type your message...",
    initiallyOpen: false,
    onSendMessage: mockMessageHandler,
  },
};

export const InitiallyOpen: Story = {
  args: {
    ...Default.args,
    initiallyOpen: true,
  },
};

// Documentation for stories
Default.parameters = {
  docs: {
    description: {
      story:
        "The default configuration of the chatbot widget with a floating button that expands into a chat interface.",
    },
  },
};

InitiallyOpen.parameters = {
  docs: {
    description: {
      story:
        "The chatbot widget initialized in an open state, showing the chat interface immediately when the page loads.",
    },
  },
};
