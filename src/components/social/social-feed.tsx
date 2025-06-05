// "use client";

// import React, { useState, useEffect } from "react";
// import { Card } from "../ui/card";
// import StoriesCarousel from "./stories-carousel";
// import FeedFilters from "./feed-filters";
// import PostList from "./post-list";
// import FeedSidebar from "./feed-sidebar";
// import { CreatePost } from "./create-post";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { X, ChevronLeft, ChevronRight, FileText } from "lucide-react";
// import { StoryCreator } from "./story-creator";
// import { DocumentViewer } from "../document-viewer";

// interface Story {
//   id: string;
//   user: {
//     name: string;
//     avatar: string;
//     role?: string;
//   };
//   viewed: boolean;
//   timestamp: string;
//   content?: {
//     type: "image" | "video" | "text" | "document";
//     src?: string;
//     text?: string;
//     location?: string;
//     tags?: string[];
//     documentType?: string;
//   }[];
// }

// interface SocialFeedProps {
//   userRole?: string;
//   currentUser?: {
//     name: string;
//     avatar: string;
//   };
// }

// const SocialFeed = ({
//   userRole = "farmer",
//   currentUser = {
//     name: "John Farmer",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
//   },
// }: SocialFeedProps) => {
//   // State for feed management
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [activeSort, setActiveSort] = useState("latest");
//   const [activeView, setActiveView] = useState<"grid" | "list">("list");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // Story viewer state
//   const [storyViewerOpen, setStoryViewerOpen] = useState(false);
//   const [activeStoryIndex, setActiveStoryIndex] = useState(0);
//   const [activeStoryContentIndex, setActiveStoryContentIndex] = useState(0);
//   const [activeUserStories, setActiveUserStories] = useState<Story[]>([]);

//   // Document viewer state
//   const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
//   const [activeDocument, setActiveDocument] = useState<string>("");
//   const [activeDocumentType, setActiveDocumentType] = useState<string>("");

//   // Story creator state
//   const [storyCreatorOpen, setStoryCreatorOpen] = useState(false);

//   // Mock posts data with South African, Kenyan, and Lesotho content
//   const [posts, setPosts] = useState([
//     {
//       id: "1",
//       author: {
//         name: "Thabo Mofokeng",
//         role: "Farmer",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thabo",
//       },
//       content:
//         "Just harvested our first batch of organic tomatoes for the season! They're looking great and will be available at the Cape Town Farmers Market tomorrow. #OrganicFarming #SouthAfricanProduce",
//       image:
//         "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
//       likes: 24,
//       comments: 5,
//       timestamp: "2023-11-10T14:30:00",
//       location: "Cape Town, South Africa",
//       tags: ["OrganicFarming", "SouthAfricanProduce", "FarmersMarket"],
//     },
//     {
//       id: "2",
//       author: {
//         name: "Wanjiku Kamau",
//         role: "Distributor",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wanjiku",
//       },
//       content:
//         "Looking for farmers in the Nairobi Region with maize ready for distribution. We have several retailers looking for quality produce. Contact me for details. #KenyaAgriTech #Maize",
//       likes: 18,
//       comments: 12,
//       timestamp: "2023-11-10T09:45:00",
//       location: "Nairobi, Kenya",
//       tags: ["KenyaAgriTech", "Maize", "Distribution"],
//     },
//     {
//       id: "3",
//       author: {
//         name: "Tumelo Lerotholi",
//         role: "Wool Producer",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tumelo",
//       },
//       content:
//         "Our Merino wool production is up 15% this season thanks to improved farming practices and the excellent climate in the highlands. Proud of our team's hard work! #LesothoWool #HighlandFarming",
//       image:
//         "https://images.unsplash.com/photo-1470137430626-983a37b8ea46?w=800&q=80",
//       likes: 42,
//       comments: 8,
//       timestamp: "2023-11-09T16:20:00",
//       location: "Maseru, Lesotho",
//       tags: ["LesothoWool", "HighlandFarming", "MerinoWool"],
//     },
//     {
//       id: "4",
//       author: {
//         name: "Sipho Nkosi",
//         role: "Agricultural Consultant",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sipho",
//       },
//       content:
//         "I've just uploaded our latest report on sustainable farming practices in Southern Africa. This document includes case studies from Lesotho, South Africa, and Botswana. Download and share with your network! #SustainableFarming #AgriResearch",
//       document: "https://africau.edu/images/default/sample.pdf",
//       documentType: "PDF Report",
//       likes: 31,
//       comments: 7,
//       timestamp: "2023-11-08T11:15:00",
//       location: "Johannesburg, South Africa",
//       tags: ["SustainableFarming", "AgriResearch", "CaseStudies"],
//     },
//     {
//       id: "5",
//       author: {
//         name: "Amara Okafor",
//         role: "AgriTech Developer",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amara",
//       },
//       content:
//         "Check out our new mobile app demo for small-scale farmers! It helps track crop growth, weather patterns, and market prices - all in one place. #AgriTech #FarmingApps",
//       video: "https://example.com/videos/farm-app-demo.mp4",
//       likes: 56,
//       comments: 14,
//       timestamp: "2023-11-07T15:40:00",
//       location: "Lagos, Nigeria",
//       tags: ["AgriTech", "FarmingApps", "SmallScaleFarmers"],
//     },
//     {
//       id: "6",
//       author: {
//         name: "Nandi Mbeki",
//         role: "Agricultural Researcher",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nandi",
//       },
//       content:
//         "Our research team has compiled a comprehensive guide on drought-resistant farming techniques. This document is free to download and share with farmers in your community. #DroughtResistant #ClimateAdaptation",
//       document:
//         "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//       documentType: "Research Guide",
//       likes: 47,
//       comments: 9,
//       timestamp: "2023-11-06T13:20:00",
//       location: "Pretoria, South Africa",
//       tags: ["DroughtResistant", "ClimateAdaptation", "Research"],
//     },
//   ]);

//   // Enhanced stories data with content from South Africa, Kenya, and Lesotho
//   const stories: Story[] = [
//     {
//       id: "1",
//       user: {
//         name: "Thabo Mofokeng",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thabo",
//         role: "Farmer",
//       },
//       viewed: false,
//       timestamp: "2h",
//       content: [
//         {
//           type: "image",
//           src: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80",
//           location: "Cape Town, South Africa",
//           tags: ["OrganicFarming", "Tomatoes"],
//         },
//         {
//           type: "text",
//           text: "Our tomato harvest is looking amazing this season! 🍅",
//           tags: ["SouthAfricanProduce"],
//         },
//       ],
//     },
//     {
//       id: "2",
//       user: {
//         name: "Wanjiku Kamau",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wanjiku",
//         role: "Distributor",
//       },
//       viewed: false,
//       timestamp: "4h",
//       content: [
//         {
//           type: "image",
//           src: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
//           location: "Nairobi, Kenya",
//           tags: ["Maize", "Distribution"],
//         },
//         {
//           type: "text",
//           text: "Looking for quality maize suppliers! Contact me for details.",
//           tags: ["KenyaAgriTech"],
//         },
//         {
//           type: "image",
//           src: "https://images.unsplash.com/photo-1591086429666-004a4b6a1241?w=800&q=80",
//           location: "Nairobi, Kenya",
//           tags: ["Logistics", "FarmToTable"],
//         },
//       ],
//     },
//     {
//       id: "3",
//       user: {
//         name: "Tumelo Lerotholi",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tumelo",
//         role: "Wool Producer",
//       },
//       viewed: true,
//       timestamp: "8h",
//       content: [
//         {
//           type: "image",
//           src: "https://images.unsplash.com/photo-1470137430626-983a37b8ea46?w=800&q=80",
//           location: "Maseru, Lesotho",
//           tags: ["LesothoWool", "HighlandFarming"],
//         },
//         {
//           type: "text",
//           text: "Our Merino wool production is thriving in the highlands! 🐑",
//           tags: ["MerinoWool"],
//         },
//       ],
//     },
//     {
//       id: "4",
//       user: {
//         name: "Sipho Nkosi",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sipho",
//         role: "Agricultural Consultant",
//       },
//       viewed: false,
//       timestamp: "12h",
//       content: [
//         {
//           type: "document",
//           src: "https://example.com/documents/sustainable-farming-report.pdf",
//           documentType: "PDF Report",
//           location: "Johannesburg, South Africa",
//           tags: ["SustainableFarming", "AgriResearch"],
//         },
//         {
//           type: "text",
//           text: "Just published our latest research on sustainable farming practices in Southern Africa. Check it out! 📊",
//           tags: ["Research", "Sustainability"],
//         },
//       ],
//     },
//     {
//       id: "5",
//       user: {
//         name: "Lindiwe Dlamini",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lindiwe",
//         role: "Retailer",
//       },
//       viewed: true,
//       timestamp: "1d",
//       content: [
//         {
//           type: "image",
//           src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
//           location: "Johannesburg, South Africa",
//           tags: ["FreshProduce", "LocalMarket"],
//         },
//       ],
//     },
//   ];

//   // Mock trending hashtags for South Africa, Kenya, and Lesotho
//   const trendingHashtags = [
//     { tag: "SouthAfricanFarmers", posts: 1243 },
//     { tag: "KenyaAgriTech", posts: 876 },
//     { tag: "LesothoWoolProducers", posts: 654 },
//     { tag: "DroughtResistant", posts: 521 },
//     { tag: "AfricanProduce", posts: 498 },
//   ];

//   // Mock suggested connections from South Africa, Kenya, and Lesotho
//   const suggestedConnections = [
//     {
//       id: "1",
//       name: "Thabo Mofokeng",
//       role: "Farmer",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thabo",
//       mutualConnections: 5,
//       location: "Cape Town, South Africa",
//     },
//     {
//       id: "2",
//       name: "Wanjiku Kamau",
//       role: "Distributor",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wanjiku",
//       mutualConnections: 3,
//       location: "Nairobi, Kenya",
//     },
//     {
//       id: "3",
//       name: "Tumelo Lerotholi",
//       role: "Wool Producer",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tumelo",
//       mutualConnections: 8,
//       location: "Maseru, Lesotho",
//     },
//   ];

//   // Story progress timer
//   useEffect(() => {
//     let timer: NodeJS.Timeout;

//     if (storyViewerOpen && activeUserStories.length > 0) {
//       const currentStory = activeUserStories[activeStoryIndex];
//       const contentCount = currentStory.content?.length || 0;

//       if (contentCount > 0) {
//         timer = setTimeout(() => {
//           if (activeStoryContentIndex < contentCount - 1) {
//             // Move to next content in the same story
//             setActiveStoryContentIndex(activeStoryContentIndex + 1);
//           } else if (activeStoryIndex < activeUserStories.length - 1) {
//             // Move to next story
//             setActiveStoryIndex(activeStoryIndex + 1);
//             setActiveStoryContentIndex(0);
//           } else {
//             // End of stories
//             setStoryViewerOpen(false);
//           }
//         }, 5000); // 5 seconds per story content
//       }
//     }

//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [
//     storyViewerOpen,
//     activeStoryIndex,
//     activeStoryContentIndex,
//     activeUserStories,
//   ]);

//   // Handler functions
//   const handleFilterChange = (filter: string) => {
//     setIsLoading(true);
//     setActiveFilter(filter);
//     // Simulate API call to filter posts
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//   };

//   const handleSortChange = (sort: string) => {
//     setIsLoading(true);
//     setActiveSort(sort);
//     // Simulate API call to sort posts
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//   };

//   const handleViewChange = (view: "grid" | "list") => {
//     setActiveView(view);
//   };

//   const handleSearch = (query: string) => {
//     setIsLoading(true);
//     setSearchQuery(query);
//     // Simulate API call to search posts
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//   };

//   const handleLoadMore = () => {
//     setIsLoading(true);
//     // Simulate loading more posts
//     setTimeout(() => {
//       // Add more mock posts
//       const newPosts = [
//         {
//           id: `${posts.length + 1}`,
//           author: {
//             name: "Sipho Nkosi",
//             role: "Farmer",
//             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sipho",
//           },
//           content:
//             "Just received my new irrigation system! Can't wait to set it up and improve our farm's efficiency. #AgriTech #SouthAfrica",
//           likes: 15,
//           comments: 3,
//           timestamp: "2023-11-09T08:15:00",
//           location: "Durban, South Africa",
//           tags: ["AgriTech", "SouthAfrica", "Irrigation"],
//         },
//         {
//           id: `${posts.length + 2}`,
//           author: {
//             name: "Njeri Wainaina",
//             role: "Agricultural Expert",
//             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=njeri",
//           },
//           content:
//             "Hosting a workshop on sustainable farming practices next weekend in Nakuru. All farmers in the region are welcome to attend! #Sustainability #KenyaFarmerEducation",
//           image:
//             "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80",
//           likes: 32,
//           comments: 7,
//           timestamp: "2023-11-08T14:30:00",
//           location: "Nakuru, Kenya",
//           tags: ["Sustainability", "KenyaFarmerEducation", "Workshop"],
//         },
//       ];
//       setPosts([...posts, ...newPosts]);
//       setIsLoading(false);

//       // If we've loaded enough posts, set hasMore to false
//       if (posts.length >= 10) {
//         setHasMore(false);
//       }
//     }, 1000);
//   };

//   const handleRefresh = () => {
//     setIsLoading(true);
//     // Simulate refreshing the feed
//     setTimeout(() => {
//       // Shuffle the order of posts to simulate new content
//       const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
//       setPosts(shuffledPosts);
//       setIsLoading(false);
//       setHasMore(true);
//     }, 1000);
//   };

//   const handleStoryClick = (storyId: string) => {
//     // Find the clicked story and all stories from the same user
//     const clickedStoryIndex = stories.findIndex(
//       (story) => story.id === storyId,
//     );
//     if (clickedStoryIndex !== -1) {
//       const clickedStory = stories[clickedStoryIndex];
//       const userStories = stories.filter(
//         (story) => story.user.name === clickedStory.user.name,
//       );

//       setActiveUserStories(userStories);
//       setActiveStoryIndex(
//         userStories.findIndex((story) => story.id === storyId),
//       );
//       setActiveStoryContentIndex(0);
//       setStoryViewerOpen(true);
//     }
//   };

//   const handleCreateStory = () => {
//     setStoryCreatorOpen(true);
//   };

//   const handlePostCreated = (
//     content: string,
//     media?: { type: string; url: string },
//   ) => {
//     // Create a new post and add it to the top of the feed
//     const newPost = {
//       id: `${Date.now()}`,
//       author: {
//         name: currentUser.name,
//         role: userRole.charAt(0).toUpperCase() + userRole.slice(1),
//         avatar: currentUser.avatar,
//       },
//       content: content,
//       image: media?.type === "image" ? media.url : undefined,
//       video: media?.type === "video" ? media.url : undefined,
//       document: media?.type === "document" ? media.url : undefined,
//       documentType: media?.type === "document" ? "Document" : undefined,
//       likes: 0,
//       comments: 0,
//       timestamp: new Date().toISOString(),
//       location: "Maseru, Lesotho", // Default location
//       tags: [],
//     };

//     setPosts([newPost, ...posts]);
//   };

//   const handleTagClick = (tag: string) => {
//     // Handle hashtag click - in a real app, this would filter posts by tag
//     setSearchQuery(tag);
//     handleSearch(tag);
//   };

//   const handleNextStory = () => {
//     const currentStory = activeUserStories[activeStoryIndex];
//     const contentCount = currentStory.content?.length || 0;

//     if (activeStoryContentIndex < contentCount - 1) {
//       // Move to next content in the same story
//       setActiveStoryContentIndex(activeStoryContentIndex + 1);
//     } else if (activeStoryIndex < activeUserStories.length - 1) {
//       // Move to next story
//       setActiveStoryIndex(activeStoryIndex + 1);
//       setActiveStoryContentIndex(0);
//     } else {
//       // End of stories
//       setStoryViewerOpen(false);
//     }
//   };

//   const handlePrevStory = () => {
//     if (activeStoryContentIndex > 0) {
//       // Move to previous content in the same story
//       setActiveStoryContentIndex(activeStoryContentIndex - 1);
//     } else if (activeStoryIndex > 0) {
//       // Move to previous story
//       setActiveStoryIndex(activeStoryIndex - 1);
//       const prevStoryContentCount =
//         activeUserStories[activeStoryIndex - 1].content?.length || 0;
//       setActiveStoryContentIndex(prevStoryContentCount - 1);
//     }
//   };

//   const handleDocumentClick = (documentUrl: string, documentType: string) => {
//     setActiveDocument(documentUrl);
//     setActiveDocumentType(documentType);
//     setDocumentViewerOpen(true);
//   };

//   const handleStoryCreated = (newStory: any) => {
//     // Add the new story to the stories array
//     const updatedStories = [newStory, ...stories];
//     // In a real app, this would call an API to save the story
//     // For now, we'll just update the local state
//     // This is a mock implementation - in a real app, you would update the state properly
//     alert(t("social.storyCreatedSuccess"));
//   };

//   // Render the current story content
//   const renderStoryContent = () => {
//     if (activeUserStories.length === 0) return null;

//     const currentStory = activeUserStories[activeStoryIndex];
//     if (!currentStory.content || currentStory.content.length === 0) return null;

//     const content = currentStory.content[activeStoryContentIndex];

//     return (
//       <div className="relative h-full w-full flex flex-col items-center justify-center bg-black">
//         {/* Story header */}
//         <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
//           <div className="flex items-center space-x-2">
//             <img
//               src={currentStory.user.avatar}
//               alt={currentStory.user.name}
//               className="w-10 h-10 rounded-full border-2 border-primary"
//             />
//             <div>
//               <p className="text-white font-medium">{currentStory.user.name}</p>
//               <p className="text-white/70 text-xs">
//                 {currentStory.user.role} • {currentStory.timestamp}
//               </p>
//             </div>
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="text-white hover:bg-white/20"
//             onClick={() => setStoryViewerOpen(false)}
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* Story progress bar */}
//         <div className="absolute top-16 left-0 right-0 z-10 flex space-x-1 px-4">
//           {currentStory.content.map((_, index) => (
//             <div
//               key={index}
//               className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden"
//             >
//               <div
//                 className={`h-full bg-white ${index === activeStoryContentIndex ? "animate-progress" : index < activeStoryContentIndex ? "w-full" : "w-0"}`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Story content */}
//         {content.type === "image" && (
//           <img
//             src={content.src}
//             alt="Story"
//             className="h-full w-full object-contain"
//           />
//         )}

//         {content.type === "video" && (
//           <video
//             src={content.src}
//             controls
//             autoPlay
//             className="h-full w-full object-contain"
//           />
//         )}

//         {content.type === "text" && (
//           <div className="bg-gradient-to-b from-primary/80 to-primary p-8 rounded-lg max-w-md text-center">
//             <p className="text-white text-xl font-medium">{content.text}</p>
//           </div>
//         )}

//         {content.type === "document" && (
//           <div className="bg-white p-6 rounded-lg max-w-md text-center">
//             <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
//             <p className="text-xl font-medium mb-2">
//               {content.documentType || "Document"}
//             </p>
//             <Button
//               onClick={() =>
//                 handleDocumentClick(
//                   content.src || "",
//                   content.documentType || "Document",
//                 )
//               }
//               className="mt-4"
//             >
//               View Document
//             </Button>
//           </div>
//         )}

//         {/* Story footer */}
//         <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/70 to-transparent">
//           {content.location && (
//             <p className="text-white/90 text-sm mb-2">📍 {content.location}</p>
//           )}
//           {content.tags && content.tags.length > 0 && (
//             <div className="flex flex-wrap gap-2">
//               {content.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="text-primary-foreground bg-primary/80 px-2 py-1 rounded-full text-xs"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Navigation controls */}
//         <button
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-1 text-white/90 hover:bg-black/50"
//           onClick={handlePrevStory}
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </button>

//         <button
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-1 text-white/90 hover:bg-black/50"
//           onClick={handleNextStory}
//         >
//           <ChevronRight className="h-6 w-6" />
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Social Feed</h1>
//         <p className="text-muted-foreground">
//           Connect with the agricultural community across Africa
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {/* Main feed column */}
//         <div className="md:col-span-2 lg:col-span-3 space-y-6">
//           {/* Stories carousel */}
//           <StoriesCarousel
//             stories={stories}
//             currentUser={currentUser}
//             onStoryClick={handleStoryClick}
//             onCreateStory={handleCreateStory}
//           />

//           {/* Create post component */}
//           <CreatePost user={currentUser} onPostCreated={handlePostCreated} />

//           {/* Feed filters */}
//           <FeedFilters
//             onFilterChange={handleFilterChange}
//             onSortChange={handleSortChange}
//             onViewChange={handleViewChange}
//             onSearch={handleSearch}
//             activeFilter={activeFilter}
//             activeSort={activeSort}
//             activeView={activeView}
//           />

//           {/* Post list */}
//           <PostList
//             posts={posts}
//             currentUser={currentUser}
//             isLoading={isLoading}
//             hasMore={hasMore}
//             onLoadMore={handleLoadMore}
//             onRefresh={handleRefresh}
//           />
//         </div>

//         {/* Sidebar column */}
//         <div className="hidden md:block">
//           <FeedSidebar
//             location="Maseru, Lesotho"
//             hashtags={trendingHashtags}
//             connections={suggestedConnections}
//             onTagClick={handleTagClick}
//           />
//         </div>
//       </div>

//       {/* Story Viewer Dialog */}
//       <Dialog open={storyViewerOpen} onOpenChange={setStoryViewerOpen}>
//         <DialogContent className="max-w-3xl w-full h-[80vh] p-0 overflow-hidden">
//           {renderStoryContent()}
//         </DialogContent>
//       </Dialog>

//       {/* Document Viewer Dialog */}
//       <Dialog open={documentViewerOpen} onOpenChange={setDocumentViewerOpen}>
//         <DialogContent className="max-w-4xl h-[80vh] p-0">
//           <DocumentViewer file={activeDocument} type="auto" />
//         </DialogContent>
//       </Dialog>

//       {/* Story Creator Dialog */}
//       <StoryCreator
//         open={storyCreatorOpen}
//         onOpenChange={setStoryCreatorOpen}
//         onStoryCreated={handleStoryCreated}
//         user={currentUser}
//       />
//     </div>
//   );
// };

// export default SocialFeed;
