import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

interface WeatherWidgetProps {
    location?: string;
}

export function DashboardWeatherWidget({
    location = "Maseru, Lesotho",
}: WeatherWidgetProps) {
    // Mock weather data - in a real app, this would come from an API
    const weatherData = {
        temperature: 24,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        forecast: [
            { day: "Mon", temp: 24, condition: "sunny" },
            { day: "Tue", temp: 26, condition: "sunny" },
            { day: "Wed", temp: 23, condition: "cloudy" },
            { day: "Thu", temp: 22, condition: "rainy" },
            { day: "Fri", temp: 25, condition: "sunny" },
        ],
    };

    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case "sunny":
                return <Sun className="h-6 w-6 text-yellow-500" />;
            case "cloudy":
                return <Cloud className="h-6 w-6 text-gray-500" />;
            case "rainy":
                return <CloudRain className="h-6 w-6 text-blue-500" />;
            default:
                return <Sun className="h-6 w-6 text-yellow-500" />;
        }
    };

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weather Insights</CardTitle>
                <CardDescription>{location}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        {weatherData.condition.toLowerCase().includes("cloud") ? (
                            <Cloud className="h-10 w-10 mr-2 text-gray-500" />
                        ) : weatherData.condition.toLowerCase().includes("rain") ? (
                            <CloudRain className="h-10 w-10 mr-2 text-blue-500" />
                        ) : (
                            <Sun className="h-10 w-10 mr-2 text-yellow-500" />
                        )}
                        <div>
                            <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                            <p className="text-sm text-muted-foreground">
                                {weatherData.condition}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end">
                            <Wind className="h-4 w-4 mr-1" />
                            <span className="text-sm">{weatherData.windSpeed} km/h</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Humidity: {weatherData.humidity}%
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    {weatherData.forecast.map((day) => (
                        <div key={day.day} className="text-center">
                            <p className="text-sm font-medium">{day.day}</p>
                            {getWeatherIcon(day.condition)}
                            <p className="text-sm">{day.temp}°</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
