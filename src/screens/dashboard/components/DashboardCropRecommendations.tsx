import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Leaf } from "lucide-react";

interface CropRecommendationsProps {
    location?: string;
}

export function DashboardCropRecommendations({
    location = "Maseru Region",
}: CropRecommendationsProps) {
    // Mock crop recommendation data - in a real app, this would come from an AI model
    const recommendations = [
        {
            crop: "Maize",
            confidence: 92,
            season: "Current",
            soilType: "Loamy",
        },
        {
            crop: "Beans",
            confidence: 87,
            season: "Current",
            soilType: "Clay Loam",
        },
        {
            crop: "Tomatoes",
            confidence: 85,
            season: "Upcoming",
            soilType: "Sandy Loam",
        },
        {
            crop: "Kale",
            confidence: 83,
            season: "Current",
            soilType: "Various",
        },
    ];

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">AI Crop Recommendations</CardTitle>
                <CardDescription>
                    Based on soil and climate data for {location}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recommendations.map((rec) => (
                        <div key={rec.crop} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Leaf className="h-5 w-5 mr-2 text-green-600" />
                                <div>
                                    <p className="font-medium">{rec.crop}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {rec.season} season • {rec.soilType} soil
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                    <div
                                        className="h-full bg-green-600 rounded-full"
                                        style={{ width: `${rec.confidence}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium">{rec.confidence}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
