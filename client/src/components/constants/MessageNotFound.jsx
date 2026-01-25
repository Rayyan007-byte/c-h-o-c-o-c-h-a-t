import React from 'react'

const MessageNotFound = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
  <div className="text-center text-gray-400 px-4">
    
    {/* Icon */}
    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h8m-8 4h5m-9 6l-2 2V4a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H7z"
        />
      </svg>
    </div>

    {/* Text */}
    <h3 className="text-lg font-semibold text-gray-300">
      No messages yet
    </h3>
    <p className="text-sm mt-1 text-gray-500">
      Start the conversation by sending a message
    </p>

  </div>
</div>

  )
}

export default MessageNotFound
