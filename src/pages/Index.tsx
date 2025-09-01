import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Video, 
  Users, 
  Wifi, 
  Smartphone, 
  Globe, 
  Search,
  Play,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import { sampleCourses, liveClasses } from '@/lib/courseData';
import CourseCard from '@/components/CourseCard';

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = sampleCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingLiveClasses = liveClasses.filter(lc => !lc.isLive).slice(0, 2);
  const currentLiveClasses = liveClasses.filter(lc => lc.isLive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EduConnect
                </h1>
                <p className="text-xs text-muted-foreground">Remote Learning Platform</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => navigate('/live')}>
                <Video className="h-4 w-4 mr-2" />
                Live Classes
              </Button>
              <Button variant="ghost">
                <Users className="h-4 w-4 mr-2" />
                Community
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Learn Without Limits
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access quality education from anywhere, even with limited internet. 
            Designed for rural and underserved communities.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Wifi className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Low Bandwidth Optimized</h3>
                <p className="text-sm text-muted-foreground">
                  Works with slow internet connections
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Smartphone className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Mobile Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized for low-powered devices
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Offline Support</h3>
                <p className="text-sm text-muted-foreground">
                  Download content for offline learning
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="live">Live Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-8">
            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{sampleCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Courses Available</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </CardContent>
              </Card>
            </div>

            {/* Courses Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Available Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onClick={() => navigate(`/course/${course.id}`)}
                  />
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-8">
            {/* Live Classes */}
            <div className="space-y-6">
              {currentLiveClasses.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    Live Now
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentLiveClasses.map((liveClass) => (
                      <Card key={liveClass.id} className="border-red-200 bg-red-50/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{liveClass.title}</CardTitle>
                            <Badge variant="destructive">LIVE</Badge>
                          </div>
                          <CardDescription>
                            {liveClass.instructor} • {liveClass.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {liveClass.duration}
                            </div>
                            <Button onClick={() => navigate('/live')}>
                              <Play className="h-4 w-4 mr-2" />
                              Join Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Classes */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Upcoming Classes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingLiveClasses.map((liveClass) => (
                    <Card key={liveClass.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{liveClass.title}</CardTitle>
                        <CardDescription>
                          {liveClass.instructor} • {liveClass.subject}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {new Date(liveClass.scheduledTime).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Duration: {liveClass.duration}
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => navigate('/live')}>
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {upcomingLiveClasses.length === 0 && currentLiveClasses.length === 0 && (
                  <div className="text-center py-12">
                    <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No live classes scheduled</h3>
                    <p className="text-muted-foreground">
                      Check back later for upcoming live sessions
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}