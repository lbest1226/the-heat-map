import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Check, AlertTriangle, Loader2, ChevronDown } from "lucide-react";

const STATUS = {
  pending: { icon: Loader2, label: "queued", spin: true },
  running: { icon: Loader2, label: "running", spin: true },
  in_progress: { icon: Loader2, label: "working", spin: true },
  completed: { icon: Check, label: "done" },
  success: { icon: Check, label: "done" },
  failed: { icon: AlertTriangle, label: "failed" },
  error: { icon: AlertTriangle, label: "error" },
};

function FunctionDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS[toolCall.status] || STATUS.pending;
  const Icon = status.icon;
  const proj = toolCall.display_projection || {};
  const hide = proj.hide_details && proj.details_redacted;

  const failed =
    ["failed", "error"].includes(toolCall.status) ||
    (typeof toolCall.results === "string" && /error|failed/i.test(toolCall.results)) ||
    (toolCall.results && typeof toolCall.results === "object" && toolCall.results.success === false);

  let args = toolCall.arguments_string;
  try {
    args = JSON.parse(args);
  } catch {
    /* keep raw */
  }
  let results = toolCall.results;
  try {
    if (typeof results === "string") results = JSON.parse(results);
  } catch {
    /* keep raw */
  }

  const label = failed
    ? proj.error_label || "failed"
    : ["pending", "running", "in_progress"].includes(toolCall.status)
      ? proj.active_label || status.label
      : proj.label || status.label;

  return (
    <div className="mt-2 text-[0.7rem] font-mono" style={{ color: "rgba(242,232,207,0.5)" }}>
      <button
        type="button"
        onClick={() => !hide && setExpanded((e) => !e)}
        className="flex items-center gap-1.5"
        disabled={hide}
      >
        <Icon size={12} className={status.spin ? "animate-spin" : ""} style={{ color: "#FF4D00" }} />
        <span style={{ color: "#F2E8CF" }}>{toolCall.name}</span>
        <span style={{ color: failed ? "#FF4D00" : "rgba(242,232,207,0.5)" }}>· {label}</span>
        {!hide && (
          <ChevronDown
            size={12}
            className={expanded ? "rotate-180 transition-transform" : "transition-transform"}
          />
        )}
      </button>
      {expanded && !hide && (
        <div className="mt-1 pl-4 space-y-1.5">
          {args !== undefined && (
            <div>
              <div style={{ color: "rgba(242,232,207,0.4)" }}>args</div>
              <pre className="whitespace-pre-wrap break-words p-1.5 rounded" style={{ background: "rgba(0,0,0,0.4)" }}>
                {typeof args === "string" ? args : JSON.stringify(args, null, 2)}
              </pre>
            </div>
          )}
          {results !== undefined && (
            <div>
              <div style={{ color: "rgba(242,232,207,0.4)" }}>result</div>
              <pre className="whitespace-pre-wrap break-words p-1.5 rounded" style={{ background: "rgba(0,0,0,0.4)" }}>
                {typeof results === "string" ? results : JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={isUser ? "max-w-[82%] rounded-2xl rounded-br-sm px-3.5 py-2" : "max-w-[88%]"}
        style={isUser ? { background: "#FF4D00", color: "#0D0D0D" } : {}}
      >
        {message.content &&
          (isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="text-sm leading-relaxed" style={{ color: "#F2E8CF" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...p }) => (
                    <a {...p} target="_blank" rel="noopener noreferrer" style={{ color: "#FF4D00", textDecoration: "underline", fontWeight: 600 }} />
                  ),
                  ul: ({ node, ...p }) => <ul {...p} className="list-disc pl-4 my-1 space-y-0.5" />,
                  ol: ({ node, ...p }) => <ol {...p} className="list-decimal pl-4 my-1 space-y-0.5" />,
                  p: ({ node, ...p }) => <p {...p} className="my-1" />,
                  h1: ({ node, ...p }) => <h1 {...p} className="font-display text-base my-1" />,
                  h2: ({ node, ...p }) => <h2 {...p} className="font-display text-sm my-1" />,
                  h3: ({ node, ...p }) => <h3 {...p} className="font-display text-sm my-1" />,
                  strong: ({ node, ...p }) => <strong {...p} style={{ color: "#F2E8CF" }} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ))}
        {message.tool_calls?.map((tc, idx) => (
          <FunctionDisplay key={idx} toolCall={tc} />
        ))}
      </div>
    </div>
  );
}