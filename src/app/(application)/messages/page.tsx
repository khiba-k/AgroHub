import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paperclip, Send, Smile } from "lucide-react";

export default function MessagesPage() {
  // Mock conversations data
  const conversations = [
    {
      id: "1",
      name: "Maria Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      lastMessage: "Do you have any tomatoes available this week?",
      time: "10:42 AM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "David Kimani",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      lastMessage: "I'll pick up the order tomorrow morning.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Sarah Ochieng",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastMessage: "Thanks for the farming advice!",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: "4",
      name: "James Mwangi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      lastMessage: "The delivery will arrive on Thursday.",
      time: "Monday",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      name: "Lucy Wanjiku",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lucy",
      lastMessage: "I'm interested in your organic vegetables.",
      time: "Monday",
      unread: 0,
      online: false,
    },
  ];

  // Mock messages for the active conversation
  const messages = [
    {
      id: "1",
      sender: "Maria Rodriguez",
      content:
        "Hello! I saw your listing for organic tomatoes. Do you have any available this week?",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: "2",
      sender: "Me",
      content:
        "Hi Maria! Yes, we just harvested a fresh batch yesterday. How many kilograms would you need?",
      time: "10:35 AM",
      isMe: true,
    },
    {
      id: "3",
      sender: "Maria Rodriguez",
      content:
        "That's great! I would need about 10kg for my restaurant. What's your price per kg?",
      time: "10:38 AM",
      isMe: false,
    },
    {
      id: "4",
      sender: "Me",
      content:
        "For 10kg, I can offer $2.80 per kg. They're all premium quality, organic certified.",
      time: "10:40 AM",
      isMe: true,
    },
    {
      id: "5",
      sender: "Maria Rodriguez",
      content: "Do you have any tomatoes available this week?",
      time: "10:42 AM",
      isMe: false,
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communicate with your network</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <Input
                  placeholder="Search messages..."
                  className="sticky top-0 rounded-none border-x-0 border-t-0 focus-visible:ring-0"
                />
              </div>
              <div className="h-[calc(80vh-13rem)] overflow-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 border-b p-4 hover:bg-accent cursor-pointer ${conversation.id === "1" ? "bg-accent" : ""}`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.avatar}
                          alt={conversation.name}
                        />
                        <AvatarFallback>
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader className="border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={conversations[0].avatar}
                    alt={conversations[0].name}
                  />
                  <AvatarFallback>
                    {conversations[0].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{conversations[0].name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {conversations[0].online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="chat">
                <div className="border-b">
                  <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                    <TabsTrigger
                      value="chat"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                      Chat
                    </TabsTrigger>
                    <TabsTrigger
                      value="documents"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                      Documents
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="chat" className="m-0">
                  <div className="h-[calc(80vh-16rem)] overflow-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.isMe ? "bg-primary text-primary-foreground" : "bg-accent"}`}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button size="icon" className="rounded-full">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="documents" className="m-0 p-4">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No documents shared yet.
                    </p>
                    <Button className="mt-4">Share Document</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
