import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Play, FileText, CheckCircle, Clock } from 'lucide-react';
import { sampleCourses, Module } from '@/lib/courseData';
import VideoPlayer from '@/components/VideoPlayer';
import QuizComponent from '@/components/QuizComponent';
import AIHelper from '@/components/AIHelper';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(sampleCourses.find(c => c.id === courseId));
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (course && !activeModule) {
      setActiveModule(course.modules[0]);
    }
  }, [course, activeModule]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
  };

  const handleQuizComplete = (score: number) => {
    if (activeModule) {
      handleModuleComplete(activeModule.id);
    }
  };

  const handleVideoComplete = () => {
    if (activeModule) {
      handleModuleComplete(activeModule.id);
    }
  };

  const progressPercentage = course.modules.length > 0 
    ? (completedModules.size / course.modules.length) * 100 
    : 0;

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'reading': return <FileText className="h-4 w-4" />;
      case 'video': return <Play className="h-4 w-4" />;
      case 'quiz': return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
            <Badge variant="secondary">{course.level}</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Course Progress</span>
              <span>{completedModules.size}/{course.modules.length} modules completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Module Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {course.modules.map((module, index) => (
                  <Button
                    key={module.id}
                    variant={activeModule?.id === module.id ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => setActiveModule(module)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="flex-shrink-0 mt-0.5">
                        {completedModules.has(module.id) ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          getModuleIcon(module.type)
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{module.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeModule && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {getModuleIcon(activeModule.type)}
                      <CardTitle>{activeModule.title}</CardTitle>
                      {completedModules.has(activeModule.id) && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{activeModule.content}</CardDescription>
                  </CardHeader>
                </Card>

                {/* Module Content */}
                {activeModule.type === 'reading' && (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Reading Material</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="prose max-w-none">
                            {activeModule.content.split('\n').map((line, index) => {
                              if (line.startsWith('# ')) {
                                return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
                              } else if (line.startsWith('## ')) {
                                return <h2 key={index} className="text-xl font-semibold mt-4 mb-3">{line.substring(3)}</h2>;
                              } else if (line.startsWith('**') && line.endsWith('**')) {
                                return <p key={index} className="font-semibold mb-2">{line.slice(2, -2)}</p>;
                              } else if (line.startsWith('- ')) {
                                return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
                              } else if (line.trim()) {
                                return <p key={index} className="mb-3 leading-relaxed">{line}</p>;
                              }
                              return <br key={index} />;
                            })}
                          </div>
                          
                          <div className="mt-6 pt-6 border-t">
                            <Button 
                              onClick={() => handleModuleComplete(activeModule.id)}
                              disabled={completedModules.has(activeModule.id)}
                              className="w-full"
                            >
                              {completedModules.has(activeModule.id) ? 'Completed' : 'Mark as Complete'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="xl:col-span-1">
                      <AIHelper content={activeModule.content} />
                    </div>
                  </div>
                )}

                {activeModule.type === 'video' && activeModule.videoUrl && (
                  <VideoPlayer
                    src={activeModule.videoUrl}
                    title={activeModule.title}
                    onComplete={handleVideoComplete}
                  />
                )}

                {activeModule.type === 'quiz' && activeModule.questions && (
                  <QuizComponent
                    questions={activeModule.questions}
                    onComplete={handleQuizComplete}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}