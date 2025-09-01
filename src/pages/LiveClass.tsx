import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Video, Users, MessageCircle, Send, Calendar, Clock } from 'lucide-react';
import { liveClasses } from '@/lib/courseData';

export default function LiveClass() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(liveClasses[0]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', user: 'Teacher Sarah', message: 'Welcome everyone! Today we will solve math problems together.', time: '14:05', isTeacher: true },
    { id: '2', user: 'Student A', message: 'Thank you teacher!', time: '14:06', isTeacher: false },
    { id: '3', user: 'Student B', message: 'I have a question about fractions', time: '14:07', isTeacher: false },
    { id: '4', user: 'Teacher Sarah', message: 'Great! We will cover fractions in detail today.', time: '14:08', isTeacher: true },
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTeacher: false
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Live Classes</h1>
              <p className="text-muted-foreground">Join live sessions with teachers and other students</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Class Schedule Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Scheduled Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {liveClasses.map((liveClass) => {
                  const { date, time } = formatDateTime(liveClass.scheduledTime);
                  return (
                    <Card
                      key={liveClass.id}
                      className={`cursor-pointer transition-colors ${
                        selectedClass.id === liveClass.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedClass(liveClass)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{liveClass.title}</h4>
                            {liveClass.isLive && (
                              <Badge variant="destructive" className="text-xs">
                                LIVE
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {liveClass.instructor}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {time} • {liveClass.duration}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {liveClass.subject}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Video Stream */}
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        {selectedClass.title}
                      </CardTitle>
                      {selectedClass.isLive && (
                        <Badge variant="destructive">
                          LIVE
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      Instructor: {selectedClass.instructor} • {selectedClass.subject}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedClass.isLive ? (
                      <div className="space-y-4">
                        {/* Video Player */}
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <video
                            src={selectedClass.streamUrl}
                            controls
                            className="w-full h-full"
                            poster="/api/placeholder/800/450"
                          />
                        </div>
                        
                        {/* Live Controls */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium">Live Now</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              23 viewers
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            Started at {formatDateTime(selectedClass.scheduledTime).time}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Class Not Started</h3>
                          <p className="text-muted-foreground mb-4">
                            This class will start at {formatDateTime(selectedClass.scheduledTime).time}
                          </p>
                          <Button disabled>
                            Join Class
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Chat */}
              <div className="xl:col-span-1">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Live Chat
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-3">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium ${
                                msg.isTeacher ? 'text-blue-600' : 'text-gray-600'
                              }`}>
                                {msg.user}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {msg.time}
                              </span>
                            </div>
                            <p className="text-sm bg-gray-50 p-2 rounded">
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    {/* Chat Input */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder={selectedClass.isLive ? "Type a message..." : "Class not started"}
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          disabled={!selectedClass.isLive}
                        />
                        <Button 
                          size="sm" 
                          onClick={handleSendMessage}
                          disabled={!selectedClass.isLive || !chatMessage.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {!selectedClass.isLive && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Chat will be available when the class starts
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}