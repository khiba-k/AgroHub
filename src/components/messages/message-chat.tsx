"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Paperclip, Send, Phone, Video, Mic, Image } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isMe: boolean;
  attachments?: Array<{
    type: "image" | "document" | "audio" | "video";
    url: string;
    name?: string;
  }>;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: Date;
}

interface MessageChatProps {
  contact: Contact;
  initialMessages?: Message[];
}

export function MessageChat({
  contact,
  initialMessages = [],
}: MessageChatProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date(),
      isMe: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setTimeout(scrollToBottom, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Determine file type
    let type: "image" | "document" | "audio" | "video" = "document";
    if (file.type.startsWith("image/")) type = "image";
    if (file.type.startsWith("audio/")) type = "audio";
    if (file.type.startsWith("video/")) type = "video";

    // Create a URL for the file
    const url = URL.createObjectURL(file);

    // Create a new message with the attachment
    const message: Message = {
      id: Date.now().toString(),
      content: "",
      sender: "me",
      timestamp: new Date(),
      isMe: true,
      attachments: [{ type, url, name: file.name }],
    };

    setMessages([...messages, message]);
    setTimeout(scrollToBottom, 100);

    // Reset the file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleVoiceCall = () => {
    alert(t("messages.call") + " " + contact.name);
  };

  const handleVideoCall = () => {
    alert(t("messages.videoCall") + " " + contact.name);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic would go here
      alert("Recording started");
    } else {
      // Stop recording and send audio message logic would go here
      alert("Recording stopped and sent");

      // Simulate sending an audio message
      const message: Message = {
        id: Date.now().toString(),
        content: "",
        sender: "me",
        timestamp: new Date(),
        isMe: true,
        attachments: [
          {
            type: "audio",
            url: "#", // In a real app, this would be the URL to the recorded audio
            name: "Voice message",
          },
        ],
      };

      setMessages([...messages, message]);
      setTimeout(scrollToBottom, 100);
    }
  };

  // Render message attachments
  const renderAttachment = (attachment: Message["attachments"][0]) => {
    switch (attachment.type) {
      case "image":
        return (
          <img
            src={attachment.url}
            alt="attachment"
            className="max-w-[200px] max-h-[200px] rounded-md object-cover"
          />
        );
      case "video":
        return (
          <video
            src={attachment.url}
            controls
            className="max-w-[200px] max-h-[200px] rounded-md"
          />
        );
      case "audio":
        return (
          <audio src={attachment.url} controls className="max-w-[200px]" />
        );
      case "document":
        return (
          <div className="flex items-center p-2 bg-accent rounded-md">
            <Paperclip className="h-4 w-4 mr-2" />
            <span className="text-sm truncate max-w-[150px]">
              {attachment.name || "Document"}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-xs text-muted-foreground">
              {contact.status === "online" ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleVoiceCall}
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleVideoCall}
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] ${message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
            >
              {message.content && <p>{message.content}</p>}
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mt-2">
                  {renderAttachment(attachment)}
                </div>
              ))}
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleAttachmentClick}>
            <Paperclip className="h-5 w-5" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-5 w-5" />
          </Button>
          <Input
            placeholder={t("messages.typeMessage")}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow"
          />
          {newMessage.trim() ? (
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant={isRecording ? "destructive" : "default"}
              onClick={toggleRecording}
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
