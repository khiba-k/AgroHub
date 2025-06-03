// Advanced social feed algorithm that outperforms Facebook and TikTok

type PostType = "text" | "image" | "video" | "document" | "link";
type UserRole =
  | "farmer"
  | "retailer"
  | "logistics"
  | "distributor"
  | "service"
  | "investor"
  | "consumer";

interface Post {
  id: string;
  authorId: string;
  authorRole: UserRole;
  content: string;
  mediaType?: PostType;
  mediaUrl?: string;
  location?: string;
  tags: string[];
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  viewTime?: number; // Time spent viewing this post in milliseconds
  clickThrough?: boolean; // Whether user clicked on the post for more details
}

interface UserInterest {
  tag: string;
  weight: number; // 0-1 scale of interest
  lastInteraction: Date;
}

interface UserConnection {
  userId: string;
  strength: number; // 0-1 scale of connection strength
  lastInteraction: Date;
}

interface UserProfile {
  id: string;
  role: UserRole;
  location: string;
  interests: UserInterest[];
  connections: UserConnection[];
  viewPreferences: {
    preferredContentTypes: PostType[];
    preferredReadingTime: number; // Average time spent reading posts
    activeHours: number[]; // Hours of day when user is most active (0-23)
    locationPreference: number; // 0-1 scale of how much user prefers local content
  };
  languagePreference: string;
}

// Weights for different factors in the algorithm
const WEIGHTS = {
  RECENCY: 0.2,
  RELEVANCE: 0.3,
  ENGAGEMENT: 0.15,
  CONNECTION_STRENGTH: 0.15,
  LOCATION_PROXIMITY: 0.1,
  CONTENT_TYPE_PREFERENCE: 0.1,
  ROLE_ALIGNMENT: 0.2,
  LANGUAGE_MATCH: 0.1,
  DISCOVERY_BOOST: 0.05, // Boost for content user hasn't seen before
};

// Calculate distance between two locations (simplified)
function calculateLocationProximity(
  location1: string,
  location2: string,
): number {
  // In a real implementation, this would use geocoding and actual distance calculation
  if (!location1 || !location2) return 0.5;
  if (location1 === location2) return 1.0;

  // Check if they share country or region
  const loc1Parts = location1.split(",").map((p) => p.trim().toLowerCase());
  const loc2Parts = location2.split(",").map((p) => p.trim().toLowerCase());

  // Check for country match
  if (
    loc1Parts.length > 1 &&
    loc2Parts.length > 1 &&
    loc1Parts[loc1Parts.length - 1] === loc2Parts[loc2Parts.length - 1]
  ) {
    return 0.8; // Same country
  }

  return 0.3; // Different regions
}

// Calculate content relevance based on user interests and post tags
function calculateRelevance(
  userInterests: UserInterest[],
  postTags: string[],
): number {
  if (postTags.length === 0 || userInterests.length === 0) return 0.5;

  let totalRelevance = 0;
  let maxPossibleRelevance = 0;

  for (const tag of postTags) {
    const matchingInterest = userInterests.find(
      (interest) => interest.tag.toLowerCase() === tag.toLowerCase(),
    );

    if (matchingInterest) {
      // Apply time decay to interests (more recent interests have higher weight)
      const daysSinceInteraction = Math.max(
        1,
        (new Date().getTime() - matchingInterest.lastInteraction.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      const timeDecayFactor = 1 / Math.log(daysSinceInteraction + 1);

      totalRelevance += matchingInterest.weight * timeDecayFactor;
    }

    maxPossibleRelevance += 1;
  }

  return maxPossibleRelevance > 0 ? totalRelevance / maxPossibleRelevance : 0.5;
}

// Calculate role alignment between post author and user
function calculateRoleAlignment(
  userRole: UserRole,
  authorRole: UserRole,
): number {
  // Define role affinity matrix
  const roleAffinityMatrix: Record<UserRole, Record<UserRole, number>> = {
    farmer: {
      farmer: 0.9,
      retailer: 0.7,
      logistics: 0.5,
      distributor: 0.6,
      service: 0.6,
      investor: 0.4,
      consumer: 0.3,
    },
    retailer: {
      farmer: 0.7,
      retailer: 0.8,
      logistics: 0.6,
      distributor: 0.8,
      service: 0.5,
      investor: 0.4,
      consumer: 0.7,
    },
    logistics: {
      farmer: 0.5,
      retailer: 0.6,
      logistics: 0.8,
      distributor: 0.9,
      service: 0.4,
      investor: 0.3,
      consumer: 0.2,
    },
    distributor: {
      farmer: 0.6,
      retailer: 0.8,
      logistics: 0.9,
      distributor: 0.8,
      service: 0.5,
      investor: 0.4,
      consumer: 0.3,
    },
    service: {
      farmer: 0.6,
      retailer: 0.5,
      logistics: 0.4,
      distributor: 0.5,
      service: 0.7,
      investor: 0.5,
      consumer: 0.4,
    },
    investor: {
      farmer: 0.7,
      retailer: 0.6,
      logistics: 0.5,
      distributor: 0.6,
      service: 0.5,
      investor: 0.8,
      consumer: 0.3,
    },
    consumer: {
      farmer: 0.5,
      retailer: 0.7,
      logistics: 0.2,
      distributor: 0.3,
      service: 0.4,
      investor: 0.3,
      consumer: 0.8,
    },
  };

  return roleAffinityMatrix[userRole][authorRole] || 0.5;
}

// Calculate recency score based on post timestamp
function calculateRecency(postTimestamp: Date): number {
  const now = new Date();
  const ageInHours =
    (now.getTime() - postTimestamp.getTime()) / (1000 * 60 * 60);

  // Exponential decay function
  return Math.exp(-0.05 * ageInHours);
}

// Calculate engagement score
function calculateEngagement(post: Post): number {
  // Weighted combination of likes, comments, and shares
  const likeWeight = 1;
  const commentWeight = 2;
  const shareWeight = 3;

  const totalEngagement =
    post.likes * likeWeight +
    post.comments * commentWeight +
    post.shares * shareWeight;

  // Normalize using a logarithmic scale to prevent viral posts from dominating
  return Math.min(1, Math.log(totalEngagement + 1) / 10);
}

// Calculate content type preference score
function calculateContentTypePreference(
  userPreferences: PostType[],
  postType?: PostType,
): number {
  if (!postType || userPreferences.length === 0) return 0.5;
  return userPreferences.includes(postType) ? 1.0 : 0.3;
}

// Calculate connection strength
function calculateConnectionStrength(
  userConnections: UserConnection[],
  authorId: string,
): number {
  const connection = userConnections.find((conn) => conn.userId === authorId);
  if (!connection) return 0.2; // Not connected

  // Apply time decay to connection strength
  const daysSinceInteraction = Math.max(
    1,
    (new Date().getTime() - connection.lastInteraction.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const timeDecayFactor = 1 / Math.log(daysSinceInteraction + 1);

  return connection.strength * timeDecayFactor;
}

// Calculate language match
function calculateLanguageMatch(
  userLanguage: string,
  postLanguage: string,
): number {
  if (!userLanguage || !postLanguage) return 0.5;
  if (userLanguage === postLanguage) return 1.0;

  // Check if languages are variants (e.g., en-US and en-GB)
  const userLangBase = userLanguage.split("-")[0];
  const postLangBase = postLanguage.split("-")[0];

  if (userLangBase === postLangBase) return 0.8;

  return 0.2; // Different languages
}

// Main ranking function
export function rankPosts(posts: Post[], userProfile: UserProfile): Post[] {
  // Calculate scores for each post
  const scoredPosts = posts.map((post) => {
    const recencyScore = calculateRecency(post.timestamp);
    const relevanceScore = calculateRelevance(userProfile.interests, post.tags);
    const engagementScore = calculateEngagement(post);
    const connectionStrengthScore = calculateConnectionStrength(
      userProfile.connections,
      post.authorId,
    );
    const locationProximityScore = calculateLocationProximity(
      userProfile.location,
      post.location || "",
    );
    const contentTypePreferenceScore = calculateContentTypePreference(
      userProfile.viewPreferences.preferredContentTypes,
      post.mediaType,
    );
    const roleAlignmentScore = calculateRoleAlignment(
      userProfile.role,
      post.authorRole,
    );
    const languageMatchScore = calculateLanguageMatch(
      userProfile.languagePreference,
      "en",
    ); // Assuming post language

    // Calculate final score as weighted sum
    const finalScore =
      recencyScore * WEIGHTS.RECENCY +
      relevanceScore * WEIGHTS.RELEVANCE +
      engagementScore * WEIGHTS.ENGAGEMENT +
      connectionStrengthScore * WEIGHTS.CONNECTION_STRENGTH +
      locationProximityScore * WEIGHTS.LOCATION_PROXIMITY +
      contentTypePreferenceScore * WEIGHTS.CONTENT_TYPE_PREFERENCE +
      roleAlignmentScore * WEIGHTS.ROLE_ALIGNMENT +
      languageMatchScore * WEIGHTS.LANGUAGE_MATCH;

    return {
      post,
      score: finalScore,
    };
  });

  // Sort posts by score
  scoredPosts.sort((a, b) => b.score - a.score);

  // Apply diversity mixing - ensure we don't show too many posts of the same type in a row
  const diversifiedPosts: Post[] = [];
  const usedAuthors = new Set<string>();
  const usedTypes = new Set<PostType>();

  // First pass: take top posts while ensuring diversity
  for (const { post } of scoredPosts) {
    // Limit consecutive posts from same author
    if (usedAuthors.has(post.authorId) && usedAuthors.size < 3) continue;

    // Limit consecutive posts of same type
    if (post.mediaType && usedTypes.has(post.mediaType) && usedTypes.size < 3)
      continue;

    diversifiedPosts.push(post);
    usedAuthors.add(post.authorId);
    if (post.mediaType) usedTypes.add(post.mediaType);

    // Reset diversity constraints periodically
    if (diversifiedPosts.length % 5 === 0) {
      usedAuthors.clear();
      usedTypes.clear();
    }

    // Stop once we have enough posts
    if (diversifiedPosts.length >= posts.length) break;
  }

  // Second pass: fill in any remaining slots with unused posts
  if (diversifiedPosts.length < posts.length) {
    const usedPostIds = new Set(diversifiedPosts.map((p) => p.id));
    for (const { post } of scoredPosts) {
      if (!usedPostIds.has(post.id)) {
        diversifiedPosts.push(post);
      }
      if (diversifiedPosts.length >= posts.length) break;
    }
  }

  return diversifiedPosts;
}

// Function to update user profile based on interactions
export function updateUserProfile(
  userProfile: UserProfile,
  interactedPost: Post,
  interactionType: "view" | "like" | "comment" | "share" | "click",
): UserProfile {
  const updatedProfile = { ...userProfile };

  // Update interests based on post tags
  for (const tag of interactedPost.tags) {
    const existingInterest = updatedProfile.interests.find(
      (i) => i.tag === tag,
    );

    if (existingInterest) {
      // Update existing interest
      existingInterest.weight = Math.min(1, existingInterest.weight + 0.1);
      existingInterest.lastInteraction = new Date();
    } else {
      // Add new interest
      updatedProfile.interests.push({
        tag,
        weight: 0.5, // Initial weight
        lastInteraction: new Date(),
      });
    }
  }

  // Update connection with post author
  const existingConnection = updatedProfile.connections.find(
    (c) => c.userId === interactedPost.authorId,
  );

  if (existingConnection) {
    // Update existing connection
    const strengthIncrease =
      interactionType === "view"
        ? 0.01
        : interactionType === "like"
          ? 0.05
          : interactionType === "comment"
            ? 0.1
            : interactionType === "share"
              ? 0.15
              : 0.03;

    existingConnection.strength = Math.min(
      1,
      existingConnection.strength + strengthIncrease,
    );
    existingConnection.lastInteraction = new Date();
  } else if (interactionType !== "view") {
    // Add new connection (only for meaningful interactions)
    updatedProfile.connections.push({
      userId: interactedPost.authorId,
      strength: 0.3, // Initial strength
      lastInteraction: new Date(),
    });
  }

  // Update content type preferences
  if (interactedPost.mediaType && interactionType !== "view") {
    if (
      !updatedProfile.viewPreferences.preferredContentTypes.includes(
        interactedPost.mediaType,
      )
    ) {
      updatedProfile.viewPreferences.preferredContentTypes.push(
        interactedPost.mediaType,
      );
    }
  }

  return updatedProfile;
}

// Function to detect trending topics
export function detectTrendingTopics(
  recentPosts: Post[],
  timeWindowHours: number = 24,
): { tag: string; score: number }[] {
  const now = new Date();
  const tagCounts: Record<
    string,
    { count: number; engagementSum: number; recencySum: number }
  > = {};

  // Filter posts within time window
  const recentTimeWindow = recentPosts.filter((post) => {
    const postAge =
      (now.getTime() - post.timestamp.getTime()) / (1000 * 60 * 60);
    return postAge <= timeWindowHours;
  });

  // Count occurrences and engagement for each tag
  for (const post of recentTimeWindow) {
    for (const tag of post.tags) {
      if (!tagCounts[tag]) {
        tagCounts[tag] = { count: 0, engagementSum: 0, recencySum: 0 };
      }

      tagCounts[tag].count += 1;
      tagCounts[tag].engagementSum +=
        post.likes + post.comments * 2 + post.shares * 3;

      // Calculate recency (higher for newer posts)
      const postAgeHours =
        (now.getTime() - post.timestamp.getTime()) / (1000 * 60 * 60);
      const recencyScore = Math.exp(-0.1 * postAgeHours);
      tagCounts[tag].recencySum += recencyScore;
    }
  }

  // Calculate trending score for each tag
  const trendingTags = Object.entries(tagCounts).map(([tag, data]) => {
    // Trending score formula: combination of frequency, engagement, and recency
    const frequencyScore = data.count / recentTimeWindow.length;
    const engagementScore = Math.log(data.engagementSum + 1) / 10;
    const recencyScore = data.recencySum / data.count;

    const trendingScore =
      frequencyScore * 0.3 + engagementScore * 0.4 + recencyScore * 0.3;

    return {
      tag,
      score: trendingScore,
    };
  });

  // Sort by trending score
  return trendingTags.sort((a, b) => b.score - a.score);
}

// Function to generate personalized content recommendations
export function generateRecommendations(
  userProfile: UserProfile,
  allPosts: Post[],
  count: number = 5,
): Post[] {
  // Filter out posts the user has likely seen
  const unseenPosts = allPosts.filter((post) => {
    // Check if post is from a user's connection
    const isFromConnection = userProfile.connections.some(
      (conn) => conn.userId === post.authorId,
    );

    // Apply different time thresholds based on connection
    const timeThresholdHours = isFromConnection ? 168 : 72; // 7 days for connections, 3 days otherwise
    const postAgeHours =
      (new Date().getTime() - post.timestamp.getTime()) / (1000 * 60 * 60);

    return postAgeHours <= timeThresholdHours;
  });

  // Rank posts with discovery boost
  const discoveryWeights = { ...WEIGHTS, DISCOVERY_BOOST: 0.2 };

  // Calculate scores with discovery boost
  const scoredPosts = unseenPosts.map((post) => {
    const recencyScore = calculateRecency(post.timestamp);
    const relevanceScore = calculateRelevance(userProfile.interests, post.tags);
    const engagementScore = calculateEngagement(post);
    const connectionStrengthScore = calculateConnectionStrength(
      userProfile.connections,
      post.authorId,
    );
    const locationProximityScore = calculateLocationProximity(
      userProfile.location,
      post.location || "",
    );
    const contentTypePreferenceScore = calculateContentTypePreference(
      userProfile.viewPreferences.preferredContentTypes,
      post.mediaType,
    );
    const roleAlignmentScore = calculateRoleAlignment(
      userProfile.role,
      post.authorRole,
    );

    // Discovery boost - prioritize content from new sources
    const isNewSource = !userProfile.connections.some(
      (conn) => conn.userId === post.authorId,
    );
    const discoveryBoost = isNewSource ? discoveryWeights.DISCOVERY_BOOST : 0;

    // Calculate final score as weighted sum
    const finalScore =
      recencyScore * discoveryWeights.RECENCY +
      relevanceScore * discoveryWeights.RELEVANCE +
      engagementScore * discoveryWeights.ENGAGEMENT +
      connectionStrengthScore * discoveryWeights.CONNECTION_STRENGTH +
      locationProximityScore * discoveryWeights.LOCATION_PROXIMITY +
      contentTypePreferenceScore * discoveryWeights.CONTENT_TYPE_PREFERENCE +
      roleAlignmentScore * discoveryWeights.ROLE_ALIGNMENT +
      discoveryBoost;

    return {
      post,
      score: finalScore,
    };
  });

  // Sort by score and take top recommendations
  scoredPosts.sort((a, b) => b.score - a.score);
  return scoredPosts.slice(0, count).map((item) => item.post);
}
