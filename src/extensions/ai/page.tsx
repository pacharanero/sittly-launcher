import React, { useEffect, useMemo, useState } from "react";
import { BsRobot } from "react-icons/bs";
import { ExtensionPages } from "../../devtools/types";
import sittlyDevtools from "../../devtools/index";
import Fieldset from "@/devtools/components/fieldset";
import Textarea from "@/devtools/components/textarea";
import Input from "@/devtools/components/input";

const { components, api } = sittlyDevtools;
const { Button } = components;
const { database } = api;

const CHAT_HISTORY_KEY = "ai.chat.history";
const SETTINGS_KEY = "ai.settings";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

type AiSettings = {
  provider: string;
  apiKey: string;
  baseUrl: string;
  model: string;
  useLocalModel: boolean;
};

const generateId = () => crypto.randomUUID();

const pages: ExtensionPages = [
  {
    name: "AI Chat",
    description: "Chat with an AI assistant",
    route: "/ai",
    icon: <BsRobot />,
    component: () => {
      const [prompt, setPrompt] = useState("");
      const [messages, setMessages] = useState<ChatMessage[]>([]);
      const [isSending, setIsSending] = useState(false);
      const [settings, setSettings] = useState<AiSettings>({
        provider: "",
        apiKey: "",
        baseUrl: "",
        model: "",
        useLocalModel: false,
      });
      const [isSavingSettings, setIsSavingSettings] = useState(false);

      useEffect(() => {
        database
          .read<ChatMessage[]>(CHAT_HISTORY_KEY)
          .then((stored) => {
            if (stored && Array.isArray(stored)) setMessages(stored);
          })
          .catch(() => {
            setMessages([]);
          });
      }, []);

      useEffect(() => {
        database
          .read<AiSettings>(SETTINGS_KEY)
          .then((stored) => {
            if (stored) setSettings(stored);
          })
          .catch(() => {
            setSettings({
              provider: "",
              apiKey: "",
              baseUrl: "",
              model: "",
              useLocalModel: false,
            });
          });
      }, []);

      useEffect(() => {
        database.write(CHAT_HISTORY_KEY, messages).catch(() => {
          // Non-blocking persistence.
        });
      }, [messages]);

      const canSend = prompt.trim().length > 0 && !isSending;

      const handleSend = () => {
        if (!canSend) return;
        const trimmedPrompt = prompt.trim();
        setIsSending(true);
        const userMessage: ChatMessage = {
          id: generateId(),
          role: "user",
          content: trimmedPrompt,
          createdAt: Date.now(),
        };
        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content:
            "AI providers are not configured yet. Add a provider key in settings once available.",
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setPrompt("");
        setIsSending(false);
      };

      const handleSaveSettings = async () => {
        setIsSavingSettings(true);
        try {
          await database.write(SETTINGS_KEY, settings);
        } finally {
          setIsSavingSettings(false);
        }
      };

      const handleClear = () => {
        setMessages([]);
      };

      const sortedMessages = useMemo(
        () => [...messages].sort((a, b) => a.createdAt - b.createdAt),
        [messages]
      );

      return (
        <div className="flex h-full flex-col gap-6 p-4">
          <section className="space-y-2">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              AI Chat
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Chat with an AI assistant directly from Sittly. This is an early
              implementation focused on the UI and local history persistence.
            </p>
          </section>

          <section className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                value={settings.provider}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    provider: event.currentTarget.value,
                  }))
                }
                placeholder="OpenAI, Anthropic, Gemini, Ollama..."
              >
                <Fieldset.Label>Provider</Fieldset.Label>
              </Input>
              <Input
                value={settings.apiKey}
                type="password"
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    apiKey: event.currentTarget.value,
                  }))
                }
                placeholder="sk-..."
              >
                <Fieldset.Label>API Key</Fieldset.Label>
              </Input>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                value={settings.baseUrl}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    baseUrl: event.currentTarget.value,
                  }))
                }
                placeholder="https://api.openai.com/v1"
              >
                <Fieldset.Label>Base URL</Fieldset.Label>
              </Input>
              <Input
                value={settings.model}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    model: event.currentTarget.value,
                  }))
                }
                placeholder="gpt-4o-mini"
              >
                <Fieldset.Label>Model</Fieldset.Label>
              </Input>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={settings.useLocalModel}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      useLocalModel: event.currentTarget.checked,
                    }))
                  }
                />
                Use local model
              </label>
              <Button
                variant="secondary"
                onClick={handleSaveSettings}
                disabled={isSavingSettings}
              >
                {isSavingSettings ? "Saving..." : "Save settings"}
              </Button>
            </div>

            <Textarea
              value={prompt}
              onChange={(event) => setPrompt(event.currentTarget.value)}
              placeholder="Ask Sittly anything..."
              className="min-h-[100px]"
            >
              <Fieldset.Label>Prompt</Fieldset.Label>
            </Textarea>

            <div className="flex items-center gap-3">
              <Button onClick={handleSend} disabled={!canSend}>
                {isSending ? "Sending..." : "Send"}
              </Button>
              <Button variant="ghost" onClick={handleClear} disabled={!messages.length}>
                Clear history
              </Button>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Conversation
            </h2>
            <div className="space-y-3">
              {sortedMessages.length === 0 ? (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  No messages yet. Start the conversation above.
                </p>
              ) : (
                sortedMessages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-lg border border-neutral-200 p-3 text-sm shadow-sm dark:border-neutral-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold capitalize text-neutral-700 dark:text-neutral-200">
                        {message.role}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-neutral-700 dark:text-neutral-200">
                      {message.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      );
    },
  },
];

export default pages;
